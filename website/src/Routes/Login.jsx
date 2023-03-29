import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Style/Login.css'

const Login = ({ checkLogin, user }) => {
	const [submitText, setSubmitText] = useState('')
	const [submitTextColor, setSubmitTextColor] = useState('')

	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()

		setSubmitTextColor('')
		setSubmitText('Loading...')

		const query = new FormData(document.querySelector('form'))
		const username = query.get('userID')
		const password = query.get('password')

		let newUser = await checkLogin(username, password)

		if (!newUser) {
			setSubmitTextColor('text-danger')
			setSubmitText('Incorrect email or password')
		} else {
			user.set(newUser)
			setSubmitTextColor('text-success')
			setSubmitText('Logged in successfully, redirecting')
			setTimeout(() => {
				navigate('/')
			}, 3000)
		}
	}

	return (
		<div id="loginWrapper">
			<h2>Login</h2>
			<p>Welcome back! Please enter your login details</p>
			<form onSubmit={handleSubmit}>
				<div className="form-group mb-2">
					<label htmlFor="inputEmail">Email address</label>
					<input required name="userID" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="inputPassword">Password</label>
					<input required name="password" type="password" className="form-control" id="inputPassword" placeholder="Password"/>
				</div>

				<p className={`${submitText.length > 0 ? 'mb-2' : 'mb-0'} ${submitTextColor}`}>{submitText}</p>
				<button type="submit" className="btn btn-primary mt-1">Login</button>
			</form>
		</div>
	)
}

export default Login