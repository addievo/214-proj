import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

import Nav from './Components/Nav'
import App from './Components/App'
import Contact from './Routes/Contact'
import Faq from './Routes/Faq'
import Membership from './Routes/Membership'
import Rewards from './Routes/Rewards'
import Cart from './Routes/Cart'
import Register from './Routes/Register'
import Login from './Routes/Login'
import Profile from './Routes/Profile'

const ws = new WebSocket('ws://127.0.0.1:3001/ws')

let wsOpen = false;
ws.onopen = () => wsOpen = true;

// Send messages to backend, making sure the connection is active first
const sendData = (data) => {
	if (wsOpen) {
		ws.send(JSON.stringify(data))
	} else {
		setTimeout(
			() => sendData(data),
			100
		)
	}
}

const rewardTiers = [
	'Bronze',
	'Silver',
	'Gold',
	'Iridium'
]

let user = false

const userFunctions = {
	get: () => {
		if (!user) return false
		return {...user,
			rewardTier: rewardTiers[user.rewardTier],
			nextTier: rewardTiers[user.nextTier]
		}
	},
	set: newUser => {
		user = newUser
	}
}

let resolveRewards = () => {}
let resolveEmailTaken = () => {}
let resolveRegister = () => {}
let resolveCheckLogin = () => {}
let resolveGetOrders = () => {}

// Listen for messages from backend
ws.onmessage = message => {
	const data = JSON.parse(message.data) // Parsing data to JSON

	if (data.function === 'rewards') {
		resolveRewards(data.doc)
		resolveRewards = () => {}
	}

	else if (data.function === 'getEmailAvailable') {
		resolveEmailTaken(!data.doc)
		resolveEmailTaken = () => {}
	}

	else if (data.function=== 'writeUser') {
		resolveRegister(data.doc)
		resolveRegister = () => {}
	}

	else if (data.function=== 'getUser') {
		resolveCheckLogin(data.doc)
		resolveCheckLogin = () => {}
	}

	else if (data.function=== 'getOrders') {
		resolveGetOrders(data.doc)
		resolveGetOrders = () => {}
	}
}

const getRewards = async () => {
	return new Promise((resolve, reject) => {
		sendData({function: 'getRewards'})
		resolveRewards = resolve
	})
}

const emailTaken = async email => {
	return new Promise((resolve, reject) => {
		sendData({function: 'getEmailAvailable', email})
		resolveEmailTaken = resolve
	})
}

const registerUser = async userObj => {
	user = await new Promise((resolve, reject) => {
		sendData({function: 'writeUser', ...userObj})
		resolveRegister = resolve
	})
}

const checkLogin = async (username, password) => {
	return new Promise((resolve, reject) => {
		sendData({
			function: 'getUser',
			userID: username,
			password
		})
		resolveCheckLogin = resolve
	})
}

const getOrders = async () => {
    if (!user) return false
    return new Promise((resolve, reject) => {
        sendData({function: 'getOrders', userID: user.userID})
        resolveGetOrders = resolve
    })
}

const submitOrder = () => {
	let now = new Date()
	let dd = String(now.getDate()).padStart(2, '0')
	let mm = String(now.getMonth() + 1).padStart(2, '0')
	let yy = now.getFullYear();

	let total = cart.reduce((acc, a) => acc + a.cost, 0)

	sendData({
		function: 'addOrder',
		date: `${yy}-${mm}-${dd}`,
		userID: user.userID,
		items: cart.map(r => r._id),
		total
	})

	user.points -= total

	cart = []
}

let cart = []

const cartFunctions = {
	get: () => {
		return cart
	},
	add: (element) => {
		cart.push(element)
	},
	remove: (element) => {
		let index = cart.indexOf(element)
		cart.splice(index, 1)
	}
}

// Render page
ReactDOM.render(
	<BrowserRouter>
		<Nav>
			<Routes>
				<Route path="/" element={<App/>}/>
				<Route path="/contact" element={<Contact/>}/>
				<Route path="/faq" element={<Faq/>}/>
				<Route path="/membership" element={<Membership/>}/>
				<Route path="/rewards" element={<Rewards getRewards={getRewards} cart={cartFunctions} user={userFunctions} rewardTiers={rewardTiers}/>}/>
				<Route path="/cart" element={<Cart cart={cartFunctions} user={userFunctions} submitOrder={submitOrder}/>}/>
				<Route path="/register" element={<Register emailTaken={emailTaken} registerUser={registerUser}/>}/>
				<Route path="/login" element={<Login checkLogin={checkLogin} user={userFunctions}/>}/>
				<Route path="/profile" element={<Profile user={userFunctions} getOrders={getOrders} getRewards={getRewards}/>}/>
			</Routes>
		</Nav>
	</BrowserRouter>,
	document.getElementById('root')
);