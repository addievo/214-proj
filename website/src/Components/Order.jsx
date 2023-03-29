const Reward = ({ order, rewards }) => {
	let total = 0

    return (
        <div className="orderCard">
            <h5>Order from {order.date}</h5>
			<b>Items purchased:</b>
            <ul>
				{order.items.map(reward => {
					reward = rewards.filter(r => r._id === reward)[0]
					total += reward.cost
					return (
						<li>{reward.name}</li>
					)
				})}
			</ul>
			<span><b>Total:</b> {total} points</span>
        </div>
    )
}

export default Reward