import '../Style/Home.css'
import background from '../Style/home_background.png'
import { Link } from 'react-router-dom'

const App = () => {
	return (
		<div className="homeWrapper" >
			<div className="banner" style={{ background: `url(${background})` }}>
				<h1 className="display-4">Welcome to FlyDreamAir<br/>Rewards</h1>
				<p className="lead">Where comfort up in the skies is of utmost importance</p>
			</div>
			<div className="bodyText">
				<div>
					<h2>About Us</h2>
					<p>
						FlyDreamAir is dedicated to making your flight as comfortable as we can, we value both new and existing
						customers and want to provide the best experience an airline can offer.
					</p>
					<p>
						FlyDreamAirs' new rewards system uses Airhead points to purchase goods, services and upgrades for each
						linked flight. Both new and existing customers have the ability to gain points, the customers who frequently fly
						with us will have access to additional benefits and more premium rewards.  
					</p>
					<h2>Ready to fly?</h2>
					<div className="row pt-3">
						<div className="col text-center">
							<Link to="/rewards">
								<img className="homeIcon" src={`${process.env.PUBLIC_URL}/homeIcons/shopping-cart.png`}/>
								<h5 className="homeIcon">Rewards Store</h5>
							</Link>
							
						</div>
						<div className="col text-center">
							<Link to="/membership">
								<img className="homeIcon" src={`${process.env.PUBLIC_URL}/homeIcons/medal.png`}/>
								<h5 className="homeIcon">Membership</h5>
							</Link>
						</div>
						<div className="col text-center">
							<Link to="/faq">
								<img className="homeIcon" src={`${process.env.PUBLIC_URL}/homeIcons/faq.png`}/>
								<h5 className="homeIcon">Questions?</h5>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App