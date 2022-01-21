import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.css'

function Navbar(props) {
	const {label, pagePath} = props

	return (
		<div className="nav__bar">
			<div className="nav__header">HOWDY</div>
			<Link to={pagePath} className="nav__link">{label}</Link>
		</div>
	)
}

export default Navbar
