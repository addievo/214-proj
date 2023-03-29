import React, { useState, useEffect } from 'react'
import '../Style/Cart.css'

const Contact = ({ cart, user, submitOrder }) => {
	const [contents, setContents] = useState([])

	console.log(user.get())

	const updateCart = () => {
		setContents([...cart.get()])
	}

	const addRewards = (accumulator, a) => {
		return accumulator + a.cost
	}

	useEffect(() => {
		updateCart()
	}, [])

	return (
		<div>
			<h2>Cart</h2>
			{contents.length === 0 ? (
				<p>There are no items in your cart</p>
			) : (
				<table>
					<tbody>
						<tr>
							<th className="cartData ps-3"><h4>Item</h4></th>
							<th/>
							<th className="cartData text-center"><h4>Cost</h4></th>
							<th className="cartData text-center"><h4>Remove</h4></th>
						</tr>
						{contents.map(element => {
							return (
								<tr>
									<td className="rewardImg cartData pe-3 ps-3">
										<img className="rewardImg" src={`${process.env.PUBLIC_URL}/rewards/${element.fileName}`} alt="" />
									</td>
									<td className="cartData pt-3 descriptionTD pe-4">
										<h5>{element.name}</h5>
										<p>{element.description}</p>
									</td>
									<td className="cartData pt-5 pe-4 ps-4 text-nowrap centerText">
										{element.cost} Points
									</td>
									<td className="cartData pt-5 pe-4 ps-4 centerText">
										<button className="btn btn-secondary btn-sm" onClick={() => {cart.remove(element); updateCart()}}>
											Remove
										</button>
									</td>
								</tr>
							)
						})}
						<tr id="tableDivider"><td/><td/><td/><td/></tr>
						<tr className="whiteBG">
							<td/>
							<td className="cartData pe-1 pt-3 rightText">
								<h5>Subtotal</h5>
							</td>
							<td className="pt-3 pe-4 ps-4 text-nowrap centerText">
								<h5>{`${contents.reduce(addRewards, 0)} points`}</h5>
							</td>
							<td>
								<button disabled={!user.get() || user.get().points < contents.reduce(addRewards, 0)} className="btn btn-primary btn-sm me-4 ms-4 text-nowrap" onClick={() => {submitOrder(); updateCart()}}>
									{!user.get() ? 'Please login' : user.get().points >= contents.reduce(addRewards, 0) ? 'Submit order' : 'Unsufficient points'}
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	)
}

export default Contact