import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { register } from '../../redux/actions/authAction'
import Navbar from '../Navbar/Navbar'
import Button from './Button'
import Form from './Form'
import './form.css'

function Signup() {

	// Get auth state and dispatch from Redux store
	const { auth } = useSelector(state => state)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	// Set initial state for userData
	const initialState = { 
		username: '', email: '', password: '', cf_password: ''
	}
	
	// State for user input
	const [userData, setUserData] = useState(initialState)
	const { username, email, password, cf_password } = userData


	// Redirect to home page if user already logged in
	useEffect(() => {
		if(auth.token) navigate("/")
	}, [auth.token, navigate])

	
	// Handle change in input fields
	const handleChangeInput = e => {
		const { name, value } = e.target
		setUserData({...userData, [name]:value})
	}

	// Handle form submission
	const handleSubmit = e => {
		e.preventDefault()
		dispatch(register(userData))
	}

	return (
		<React.Fragment>
			<Navbar label={'Login'} pagePath={'/'} />
			<form className="form" onSubmit={handleSubmit}>
				<Form 
					type='text' 
					name='username' 
					placeholder='Enter username' 
					label='Name'
					value={username}
					handleInput={handleChangeInput}
				/>
				<Form 
					type='email' 
					name='email' 
					placeholder='Enter Email' 
					label='Email'
					value={email}
					handleInput={handleChangeInput}
				/>
				<Form 
					type='password' 
					name='password' 
					placeholder='Enter Password' 
					label='Password'
					value={password}
					handleInput={handleChangeInput}
				/>
				<Form 
					type='password' 
					name='cf_password' 
					placeholder='Re-enter Password' 
					label='Confirm Password'
					value={cf_password}
					handleInput={handleChangeInput}
				/>
				<Button />
			</form>
		</React.Fragment>
	)
}

export default Signup
