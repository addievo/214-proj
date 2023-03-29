import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Style/Profile.css'
import Order from '../Components/Order'

const Profile = ({ user, getOrders, getRewards }) => {
	const [orders, setOrders] = useState([])
	const [rewards, setRewards] = useState([])

	useEffect(() => {
		getOrders().then(o => {
			setOrders(o)
		})
		getRewards().then(r => {
			setRewards(r)
		})
	}, [])

	let navigate = useNavigate()
	const toLogin = () => {
		setTimeout( () => {
			navigate('/login')
		}, 3000)
	}

	return (
		<div>
			<h2>Profile</h2>
			{user.get() ? 
				<div id="profileWrapper">
					<div className="tierDiv mb-4">
						<p>
							Welcome {user.get().firstName} {user.get().lastName},
							Your Airhead points balance is:<br/>
							{user.get().points} Points, you are {user.get().rewardTier} tier
						</p>
						<p>
							Progress to {user.get().nextTier} tier: {user.get().tierProgress}%
						</p>
						<div className="progress">
							<div className="progress-bar" role="progressbar" style={{width: `${user.get().tierProgress}%`}}></div>
						</div>
					</div>

					<div className="row mb-1">
						<div className="col">
							<h3>Account details</h3>
							<dl className="row">
								<dt className="col">First name</dt>
								<dd className="col">{user.get().firstName}</dd>
								<div className="w-100"></div>

								<dt className="col">Last name</dt>
								<dd className="col">{user.get().lastName}</dd>
								<div className="w-100"></div>

								<dt className="col">Phone No.</dt>
								<dd className="col">{user.get().phoneNum}</dd>
								<div className="w-100"></div>

								<dt className="col">Email address</dt>
								<dd className="col">{user.get().userID}</dd>
								<div className="w-100"></div>

								<dt className="col">Date of birth</dt>
								<dd className="col">{user.get().dateOfBirth}</dd>
							</dl>
						</div>

						<div className="col">
							<h3>Postal Address</h3>
							<dl className="row">
								<dt className="col">Street address</dt>
								<dd className="col">{user.get().addressMailing.streetAddress}</dd>
								<div className="w-100"></div>

								<dt className="col">Postcode</dt>
								<dd className="col">{user.get().addressMailing.postcode}</dd>
								<div className="w-100"></div>

								<dt className="col">State</dt>
								<dd className="col">{user.get().addressMailing.state.toUpperCase()}</dd>
							</dl>
						</div>

						<div className="col">
							<h3>Billing Address</h3>
							<dl className="row">
								<dt className="col">Street address</dt>
								<dd className="col">{user.get().addressBilling.streetAddress}</dd>
								<div className="w-100"></div>

								<dt className="col">Postcode</dt>
								<dd className="col">{user.get().addressBilling.postcode}</dd>
								<div className="w-100"></div>

								<dt className="col">State</dt>
								<dd className="col">{user.get().addressBilling.state.toUpperCase()}</dd>
							</dl>
						</div>
					</div>

					{ orders.length > 0 ?
						<div>
						<h3>Your orders</h3>
							<div className="ordersWrapper">
								{orders.map(order => <Order order={order} rewards={rewards}/>)}
							</div>
						</div>
					: "" }
				</div>
			: 
				<div>
					<p>Sorry, you must be logged in to view your profile</p>
					<p>Redirecting you to the login page now...</p>
					{toLogin()}
				</div>
			}
			
		</div>
	)
}

export default Profile