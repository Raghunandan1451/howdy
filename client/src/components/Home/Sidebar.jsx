import React from 'react'
import { useState } from 'react';


import Chat from '../Chats/ChatList';
import Contact from '../Contact/Contact'

function Sidebar() {

	const [isActive, setIsActive] = useState(true)
	return (
		<div className='left__container'>
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
			
			<div className="toggle__list_container">		
				{isActive ? <Contact /> : <Chat /> }
			</div>
		</div>
	)
}

export default Sidebar
