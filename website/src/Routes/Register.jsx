import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Style/Register.css'

const Register = ({ emailTaken, registerUser }) => {
	const [uniqueBilling, setUniqueBilling] = useState(false)
	const [submitText, setSubmitText] = useState('')
	const [submitTextColor, setSubmitTextColor] = useState('')

	const navigate = useNavigate()

	const handleChange = e => {
		setUniqueBilling(e.target.checked)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		setSubmitTextColor('')
		setSubmitText('Loading...')
		
		const userObj = {addressMailing: {}, addressBilling: {}}
		const query = new FormData(document.querySelector('form'))

		query.forEach((value, key) => {
			if (key.startsWith('post')) {
				key = key.substring(4)
				userObj.addressMailing[key] = value
			} else if (key.startsWith('bill')) {
				key = key.substring(4)
				userObj.addressBilling[key] = value
			} else if (key !== 'uniqueBilling') {
				userObj[key] = value
			}
		})
		if (!query.get('uniqueBilling')) {
			userObj.addressBilling = userObj.addressMailing
		}

		if (await emailTaken(userObj.userID)) {
			setSubmitTextColor('text-danger')
			setSubmitText('This email is already in use')
		} else {
			registerUser(userObj).then(() => {
				setSubmitTextColor('text-success')
				setSubmitText('Registered successfully, redirecting')
				setTimeout(() => {
					navigate('/')
				}, 3000)
			})
		}
	}

	return (
		<div id="registerWrapper">
			<h2>Register</h2>
			<p>Register for a new account</p>
			<form onSubmit={handleSubmit}>
				<h5>Contact Information</h5>
				<div className="form-group mb-2">
					<label htmlFor="inputEmail">Email address</label>
					<input required name="userID" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
					<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="inputPassword">Password</label>
					<input required name="password" type="password" className="form-control" id="inputPassword" placeholder="Password"/>
				</div>

				<div className="row mb-2">
					<label htmlFor="inputFirstName">Full Name</label>
					<div className="col">
						<input required name="firstName" type="text" className="form-control" id="inputFirstName" placeholder="First name"/>
					</div>
					<div className="col">
						<input required name="lastName" type="text" className="form-control" id="inputLastName" placeholder="Last name"/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="inputDOB">Date of birth</label>
					<input required name="dateOfBirth" type="date" className="form-control" id="inputDOB" />
				</div>

				<div className="form-group mb-2">
					<label htmlFor="inputPhone">Phone number</label>
					<input required name="phoneNum" type="tel" className="form-control" id="inputPhone" placeholder="0412345678" pattern="0[23478][0-9]{8}" title="Valid Australian phone number"/>
				</div>

				<h5 className="mt-3">Postal Address</h5>

				<div className="form-group mb-2">
					<label htmlFor="postinputStreet">Street Address</label>
					<input required name="poststreetAddress" type="text" className="form-control" id="postinputStreet" placeholder="Street Address"/>
				</div>

				<div className="row mb-2">
					<div className="col">
						<label htmlFor="input">Postcode</label>
						<input required name="postpostcode" type="number" className="form-control" id="input" placeholder="Postcode"/>
					</div>
					<div className="col">
						<label htmlFor="input">State</label>
						<select required name="poststate" className="form-control" id="inputState">
							<option value="NSW">NSW</option>
							<option value="NT">NT</option>
							<option value="QLD">QLD</option>
							<option value="SA">SA</option>
							<option value="TAS">TAS</option>
							<option value="VIC">VIC</option>
							<option value="WA">WA</option>
						</select>
					</div>
				</div>

				<div className="form-check form-check-inline mb-2 mt-1">
					<input name="uniqueBilling" value="true" type="checkbox" className="form-check-input" id="billingCheckbox" onChange={handleChange}></input>
					<label className="form-check-label" htmlFor="billingCheckbox">Different billing address</label>
				</div>
				<br/>
				
				{uniqueBilling ? <div>
					<div className="form-group mb-2">
						<label htmlFor="billinputStreet">Street Address</label>
						<input required name="billstreetAddress" type="text" className="form-control" id="billinputStreet" placeholder="Street Address"/>
					</div>
	
					<div className="row mb-2">
						<div className="col">
							<label htmlFor="input">Postcode</label>
							<input required name="billpostcode" type="number" className="form-control" id="input" placeholder="Postcode"/>
						</div>
						<div className="col">
							<label htmlFor="input">State</label>
							<select required name="billstate" className="form-control" id="inputState">
								<option value="NSW">NSW</option>
								<option value="NT">NT</option>
								<option value="QLD">QLD</option>
								<option value="SA">SA</option>
								<option value="TAS">TAS</option>
								<option value="VIC">VIC</option>
								<option value="WA">WA</option>
							</select>
						</div>
					</div>
				</div> : ''}
				
				<p className={`${submitText.length > 0 ? 'mb-2' : 'mb-0'} ${submitTextColor}`}>{submitText}</p>
				<button type="submit" className="btn btn-primary mt-1">Submit</button>
			</form>
		</div>
	)
}

export default Register