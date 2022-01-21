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

function Home() {

	// const [onlineUsers, setOnlineUsers] = useState([])

	const dispatch = useDispatch();
	const socket = useContext(SocketContext)
	const {auth} = useSelector(state => state)
	
	useEffect(() => {
		socket.emit('addUser', auth.user._id)
		// socket.on("getUsers", users => {
		// 	setOnlineUsers(users)
		// });
	}, [auth, socket])

	return (
		<React.Fragment>
			<div className="nav__bar">
				<div className="nav__header">HOWDY</div>
				<Link to='/' className="nav__link" onClick={() => dispatch(logout())} >Logout</Link>
			</div>
			<div className="component__container">
				<Sidebar />
				<Conversation/>
				<Instruction />
			</div>
			
		</React.Fragment>
	);
}

export default Home;
