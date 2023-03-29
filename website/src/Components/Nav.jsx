import React, { useState, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../Style/Nav.css'

import NavItem from './NavItem'
import DropdownItem from './DropdownItem'

function useOutsideAlerter(ref, getDropdownOpen, setDropdownOpen) {
	function handleClickOutside(event) {
		if (getDropdownOpen() && ref.current && !ref.current.contains(event.target)) {
			setDropdownOpen(false)
		}
	}

	document.addEventListener("mousedown", handleClickOutside)
	return () => {
		document.removeEventListener("mousedown", handleClickOutside)
	}
}

const Nav = (props) => {
	const [navOpen, setNavOpen] = useState(true)
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const dropdownRef = useRef(null)
	const getDropdownOpen = () => dropdownOpen
  	useOutsideAlerter(dropdownRef, getDropdownOpen, setDropdownOpen)

	const toggleNav = () => {
		setNavOpen(!navOpen)
	}

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen)
	}

	return [
		<div id="wrapper" style={navOpen ? {gridTemplateColumns: "14rem 1fr"} : {gridTemplateColumns: "3.6rem 1fr"}}>
			<div className="header-block">
				<i className="bi-list text-light" onClick={toggleNav}></i>
			</div>

			<nav className="navbar navbar-dark bg-dark justify-content-between">
				<Link to="/" className="navbar-brand">
					<img src={`${process.env.PUBLIC_URL}/logo.png`} className="d-inline-block align-top" alt=""/>
					AirHeads Rewards
				</Link>
				<div>
					<NavLink to="/faq">
						<i className="bi-question-circle text-light"/>
					</NavLink>
					<i className="bi-person-circle text-light" onClick={toggleDropdown}/>
				</div>
			</nav>
				
			<ul id="sideBar" className="list-group">
				<NavItem title="Home" path="/" icon="house" />
				<NavItem title="Membership" path="/membership" icon="cloud"/>
				<NavItem title="Rewards" path="/rewards" icon="bag"/>
				<NavItem title="Faq" path="/faq" icon="question-circle"/>
				<NavItem title="Contact" path="/contact" icon="person-lines-fill"/>	
			</ul>

			<main>
				<div ref={dropdownRef} id="accountDropdown" style={{display: dropdownOpen ? '' : 'none'}}>
					<ul>
						<DropdownItem title="Register" path="/register"/>
						<DropdownItem title="Login" path="/login"/>
						<DropdownItem title="Profile" path="/profile"/>
						<DropdownItem title="Orders" path="/profile"/>
						<DropdownItem title="Point balance" path="/profile"/>
						<DropdownItem title="Cart" path="/cart"/>
					</ul>
				</div>
				{props.children}
			</main>
		</div>
	]
}

export default Nav