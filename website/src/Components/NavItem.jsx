import { NavLink } from 'react-router-dom'

const NavItem = (props) => {
	return (
		<NavLink to={props.path} className={({ isActive }) => isActive ? "navLinkActive" : ""}>
			<li className="list-group-item" id="sideItem">
				<i className={`bi-${props.icon}`}/>
				<span>{props.title}</span>
			</li>
		</NavLink>
	)
}

export default NavItem