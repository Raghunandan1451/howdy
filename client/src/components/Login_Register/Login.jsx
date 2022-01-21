import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../../redux/actions/authAction'
import Form from './Form';
import './form.css'
import Button from './Button';
import Navbar from '../Navbar/Navbar';

function Login() {

	const initialState = { username: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { username, password } = userData

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if(auth.token) history.push("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }

	return (
		<React.Fragment>
			<Navbar label={'Register'} pagePath={'/register'} />
			<form className='form' onSubmit={handleSubmit}>
				<Form 
					type='text' 
					name='username' 
					placeholder='Enter username' 
					label='Name' 
					value={username}
					handleInput={handleChangeInput}
				/>
				<Form 
					type='password' 
					name='password' 
					placeholder='Enter password' 
					label='Password'
					value={password}
					handleInput={handleChangeInput} 
				/>
				<Button />
			</form>
		</React.Fragment>
	);
}

export default Login;
