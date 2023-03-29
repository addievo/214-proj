import { useState } from 'react'

const Reward = ({ reward, cart, disabled, requiredTier }) => {
	const [color, setColor] = useState('btn-primary')
	const [content, setContent] = useState(disabled ? `${requiredTier} Tier +` : 'Add to cart')

	const addedAnimation = () => {
		setColor('btn-success')
		setContent('Added to cart')
		setTimeout(() => {
			setColor('btn-primary')
			setContent('Add to cart')
		}, 1000)
	}

	return (
		<td style={{verticalAlign: 'top'}}>
			<img src={`${process.env.PUBLIC_URL}/rewards/${reward.fileName}`} alt="" />
			<h4>{reward.name}</h4>
			<p>{reward.description}</p>
			<p><b>{reward.cost} points</b></p>
			<button disabled={disabled} className={`btn ${color}`} onClick={()=>{cart.add(reward); addedAnimation()}}>{content}</button>
		</td>
	)
}

export default Reward