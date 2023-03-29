import React, { useEffect } from 'react'
import Reward from '../Components/Reward'
import '../Style/Rewards.css'

const Rewards = ({ getRewards, cart, user, rewardTiers }) => {
	const [rewards, setRewards] = React.useState([])

	useEffect(() => {
		getRewards().then((r) => {
			setRewards(r)
		})
	}, [])

	const splitRewards = []

	for (let i = 0; i < rewards.length; i += 3) {
		splitRewards.push(rewards.slice(i, i + 3))
	}

	return (
		<div>
			<h2>Rewards Store</h2>
			<p>Choose from our selection of premium products and offers</p>
			<table id="rewardsTable">
				<tbody>
					{splitRewards.map((row) => {
						return (
							<tr>
								{row.map((reward) => {
									let userTier = user.get().rewardTier || 1
									let disabled = reward.rewardTier > userTier
									return (<Reward reward={reward} cart={cart} disabled={disabled} requiredTier={rewardTiers[reward.rewardTier]}/>)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default Rewards