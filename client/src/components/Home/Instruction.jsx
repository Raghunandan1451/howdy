
import React, { Fragment } from 'react'
// import { useSelector } from 'react-redux'

/**
 * Instruction component renders the instruction for the user
 * @returns {JSX.Element} Instruction component
 */
function Instruction() {
	return (
		<div className='instruction'>
			{/* Instruction section */}
			<Fragment>
				<h2 className='header__design' >Instruction</h2>
				<div className="instruction__list">
					<ul type='none'>
						{/* Adding users to chat list */}
						<li className='instruction__line'>When you select any user from Contact List it will be appended to Chat List</li>
						{/* Chatting with users */}
						<li className='instruction__line'>You can chat with users after slecting users from chat list</li>
						{/* Don't send messages to offline users */}
						<li className='instruction__line'>Don't send messages to users who are offline</li>
					</ul>
				</div>
			</Fragment>
			{/* Need update section */}
			<Fragment>
				<h2 className='header__design'>Need Update</h2>
				<div className="list__design">
					<div className="instruction__line">
						{/* Still need to update to fetch online Users */}
						Still need to update to fetch online Users
					</div>
				</div>
			</Fragment>
		</div>
	)
}

export default Instruction
