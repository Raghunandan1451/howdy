import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Home from './components/Home/Home';
import Login from './components/Login_Register/Login'
import Register from './components/Login_Register/Register';

import { refreshToken } from './redux/actions/authAction'
import Contact from './components/Contact/Contact';
import ChatList from './components/Chats/ChatList';

const App = () => {
	
	const { auth } = useSelector(state => state)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(refreshToken())
	},[dispatch])


	return (
		<Router>
			<Routes>
				<Route path="/" element={auth.token ? <Home /> : <Login /> } />
				<Route path="/register" element={<Register/>} />
				<Route path="/contact" element={<Contact/>} />
				<Route path="/chat" element={<ChatList/>} />
			</Routes>
		</Router>
	);
};

export default App;
