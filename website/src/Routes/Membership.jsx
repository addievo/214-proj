import React from 'react'

const Membership = (props) => {
	return (
		<div>
			<h2>Membership</h2>
			<p>Our tiers are based on total points accumulated, spending points does not affect this.<br/>For every $50 spent on FlyDreamAir products/flights 100 points will be added to a linked profile. 
			<br/>All rewards tiers will be sent a monthly notice about point balance, weekly an email with that week's rewards/specials</p>
			<h5>Bronze (0 - 4000 points)</h5>
			<p>Bronze tier grants basic access to rewards 
			Bronze rewards: FlyDreamAir apparel, extra carry on, seat changes, order food ahead. </p>
			
			<h5>Silver (4000 - 10,000 points)</h5>
			<p>Silver tier grants same rewards as bronze 
			Silver: bronze + food service, 5% off flights </p>
			
			<h5>Gold (10,000 - 17,000 points)</h5>
			<p>Gold tier grants same rewards as silver 
			gold rewards: silver + seat upgrade, 10% off flights </p>
			
			<h5>Iridium (17000+ points)</h5>
			<p>iridium tier grants same rewards as all previous tiers 
			iridium rewards: Gold + lounge access, 20% off flights </p>
		</div>
	)
}

export default Membership