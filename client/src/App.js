import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
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
			<Route exact path="/" component={auth.token ? Home : Login } />
			<Route path="/register" component={Register} />
			<Route path="/contact" component={Contact} />
			<Route path="/chat" component={ChatList} />
		</Router>
	);
};

export default App;
