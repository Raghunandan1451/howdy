import React, { useContext, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'

import Sidebar from './Sidebar'
import Conversation from '../Conversation/Conversation'

import './home.css'
import '../Navbar/navbar.css'
import {logout} from '../../redux/actions/authAction'
import { SocketContext } from '../../utils/socketClient';
import Instruction from './Instruction';

// This is the main component for the home page.
function Home() {

	// Constants for dispatching and selecting data from redux store.
	const dispatch = useDispatch();
	const socket = useContext(SocketContext)
	const {auth} = useSelector(state => state)
	
	// Adding the user to the socket when the component mounts.
	useEffect(() => {
		socket.emit('addUser', auth.user._id)
		// Getting the list of online users from the server.
		// Commented out as it's not working yet.
		// socket.on("getUsers", users => {
		// 	setOnlineUsers(users)
		// });
	}, [auth, socket])

	// Rendering the component.
	return (
		<React.Fragment>
			{/* Navigation bar */}
			<div className="nav__bar">
				<div className="nav__header">HOWDY</div>
				<Link to='/' className="nav__link" onClick={() => dispatch(logout())} >Logout</Link>
			</div>
			{/* Container for the sidebar, conversation and instruction */}
			<div className="component__container">
				<Sidebar />
				<Conversation/>
				<Instruction />
			</div>
			
		</React.Fragment>
	);
}

export default Home;
