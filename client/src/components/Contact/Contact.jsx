import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

import List from './ListDisplay'
import './contact.css'
import { filtered } from '../../utils/filtered'
import {getDataAPI} from '../../utils/fetchData'

// Main function component
function Contact() {

	// States
	const [contacts, setContacts] = useState(null)
	const [exists, setExists] = useState(false)

	// Redux state
	const {auth} = useSelector(state => state)

	// Fetch user data from API on component mount
	useEffect(() => {
		const getUserData = async () => {
			try {
				const resp = await axios.get('/api/users')
				setContacts(resp.data.user)
			} catch (error) {
				console.log(error)
			}
		}
		getUserData()
	}, [])
	
	// Submit handler
	const handleSubmit = async (e) => {
		e.preventDefault()

		// Get receiver ID from clicked element
		let receiverId = e.target.getAttribute('data_id');

		// Prepare user data
		const userData = {
			senderId: auth.user._id,
			receiverId,
		}

		// Check if conversation exists
		const getExists = async () => {
			const res = await getDataAPI('conversations', auth.user._id)
			const val = filtered(res)
			setExists(val.map(id => id.includes(receiverId))[0])
		}

		getExists()

		// Post user data if conversation does not exist
		const postUserData = async (exist) => {
			try {
				if(exist) {
					await axios.post('/api/conversations', userData)
					console.log('user Exist')
				} else {
					console.log('user does not Exist')
				}
			} catch (error) {
				console.log(error)
			}
		}

		postUserData(exists)
	
	}
	
	// Return JSX
	return (
		<React.Fragment>
			{/* Map over contacts and render List component for each */
			contacts && contacts.map((list, index) => {
				return (list._id !== auth.user._id ) ? 
					<div key={index}>
						<List list={list} click={handleSubmit} />
					</div> 
					: ''}
			)}
		</React.Fragment>
	)
}

export default Contact
