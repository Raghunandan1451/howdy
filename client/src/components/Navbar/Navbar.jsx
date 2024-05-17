import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.css'

/**
 * Navbar Component
 * @param {Object} props - The properties passed to the component
 * @param {string} props.label - The label for the navbar link
 * @param {string} props.pagePath - The path to navigate to when the link is clicked
 */
function Navbar(props) {
	// Destructure the props to get the required properties
	const {label, pagePath} = props

	return (
		<div className="nav__bar">
			{/* Header of the navbar */}
			<div className="nav__header">HOWDY</div>
			{/* Link to navigate to the specified page */}
			<Link to={pagePath} className="nav__link">{label}</Link>
		</div>
	)
}

export default Navbar
