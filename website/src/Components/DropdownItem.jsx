import { NavLink } from 'react-router-dom'

const DropdownItem = (props) => {
	return (
		<NavLink to={props.path}>
			<li>
				<span>{props.title}</span>
			</li>
		</NavLink>
	)
}

export default DropdownItem