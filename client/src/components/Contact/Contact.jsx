import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

import List from './ListDisplay'
import './contact.css'
import { filtered } from '../../utils/filtered'
import {getDataAPI} from '../../utils/fetchData'

function Contact() {

	const [contacts, setContacts] = useState(null)
	const [exists, setExists] = useState(false)

	const {auth} = useSelector(state => state)

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
	
	const handleSubmit = (e) => {
		e.preventDefault()

		let receiverId = e.target.getAttribute('data_id');

		const userData = {
			senderId: auth.user._id,
			receiverId,
		}

		const getExists = async () => {
			const res = await getDataAPI('conversations', auth.user._id)
			const val = filtered(res)
			setExists(val.map(id => id.includes(receiverId))[0])
		}

		getExists()

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
	return (
		<React.Fragment>
			{contacts && contacts.map((list, index) => {
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
