import React from 'react'
import '../Style/Contact.css'

const Contact = (props) => {
	return (
		<div>
			<h2>Contact</h2>
			<form id="contactWrapper" onSubmit={e => e.preventDefault()}>
				<div className="form-group mb-2">
					<label htmlFor="inputEmail">Email address</label>
					<input required name="userID" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
				</div>

				<div className="form-group mb-2">
					<label for="exampleFormControlTextarea1">Question</label>
					<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="How do I turn off my toaster?"></textarea>
				</div>

				<button type="submit" className="btn btn-primary mt-1">Submit</button>
			</form>
		</div>
	)
}

export default Contact