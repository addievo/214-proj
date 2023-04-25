import React, { useEffect } from 'react'
import Reward from '../Components/Reward'
import '../Style/Rewards.css'

const Rewards = ({ getRewards, cart, user, rewardTiers }) => {
	const [rewards, setRewards] = React.useState([])
	const [wishlist, setWishlist] = React.useState([])

	useEffect(() => {
		getRewards().then((r) => {
			setRewards(r)
		})
	}, [])

	const splitRewards = []

	for (let i = 0; i < rewards.length; i += 3) {
		splitRewards.push(rewards.slice(i, i + 3))
	}

	const handleAddToWishlist = (reward) => {
		if (!wishlist.includes(reward)) {
			setWishlist([...wishlist, reward])
		}
	}

	return (
		<div>
			<h2>Rewards Store</h2>
			<p>Choose from our selection of premium products and offers</p>
			<div className="row">
				<div className="col-lg-9 col-md-8">
					<table id="rewardsTable">
						<tbody>
							{splitRewards.map((row, i) => {
								return (
									<tr key={`row-${i}`}>
										{row.map((reward) => {
											let userTier = user.get().rewardTier || 1
											let disabled = reward.rewardTier > userTier
											return (<Reward reward={reward} cart={cart} disabled={disabled} requiredTier={rewardTiers[reward.rewardTier]} onAddToWishlist={() => handleAddToWishlist(reward)} />)
										})}
										{row.length < 3 && <td className="empty-cell" colSpan={3 - row.length}></td>}
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
				<div className="col-lg-3 col-md-4">
					<div className="wishlist-wrapper">
						<h5>Wishlist</h5>
						{wishlist.length === 0 ? <p>No items added to wishlist</p> :
							<ul className="list-unstyled">
								{wishlist.map((reward) => {
									return (
										<li key={reward.id}>
											<Reward reward={reward} onAddToWishlist={() => {}} />
										</li>
									)
								})}
							</ul>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Rewards
