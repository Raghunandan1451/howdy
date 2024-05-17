import React from 'react'
import { useState } from 'react';

// Importing required components
import Chat from '../Chats/ChatList';
import Contact from '../Contact/Contact'

/**
 * Sidebar component displays a list of contacts and chats
 * and allows the user to toggle between them
 */
function Sidebar() {
	
	// State to keep track of active tab
	const [isActive, setIsActive] = useState(true)

	return (
		<div className='left__container'>
			{/* Toggle Items */}
			<div className="toggle_item_container">
				<div 
					className={`toggle__item ${isActive ? 'active':''}`} 
					onClick={()=>setIsActive(true)}> Contacts
				</div>
				<div 
					className={`toggle__item ${isActive ? '':'active'}`} 
					onClick={()=>setIsActive(false)}> Chats
				</div>
			</div>
			
			{/* Display the active tab */}
			<div className="toggle__list_container">		
				{isActive ? <Contact /> : <Chat /> }
			</div>
		</div>
	)
}

export default Sidebar
