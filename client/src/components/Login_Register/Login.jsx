import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../../redux/actions/authAction'
import Form from './Form';
import './form.css'
import Button from './Button';
import Navbar from '../Navbar/Navbar';

// Login Component
function Login() {

    // Set initial state for username and password
    const initialState = { username: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { username, password } = userData

    // Get authentication state from redux store
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Redirect to home page if token is present
    useEffect(() => {
        if(auth.token) navigate("/")
    }, [auth.token, navigate])

    // Handles input change
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    // Handles form submit
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }

	return (
		<React.Fragment>
			{/* Navbar component */}
			<Navbar label={'Register'} pagePath={'/register'} />
			<form className='form' onSubmit={handleSubmit}>
				{/* Form component for username */}
				<Form 
					type='text' 
					name='username' 
					placeholder='Enter username' 
					label='Name' 
					value={username}
					handleInput={handleChangeInput}
				/>
				{/* Form component for password */}
				<Form 
					type='password' 
					name='password' 
					placeholder='Enter password' 
					label='Password'
					value={password}
					handleInput={handleChangeInput} 
				/>
				{/* Button component */}
				<Button />
			</form>
		</React.Fragment>
	);
}

export default Login;
