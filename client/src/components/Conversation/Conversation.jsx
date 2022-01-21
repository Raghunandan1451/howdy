import { useState, useEffect, Fragment, useContext } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import './conversation.css'
import MessageDisplay from './MessageDisplay'
import { SocketContext } from '../../utils/socketClient'
import Top from './Top'

function Conversation() {

	const [newMessage, setNewMessage] = useState('')
	const [messages, setMessages] = useState([])
	const [arrivalMessage, setArrivalMessage] = useState(null)

	const { auth, access } = useSelector(state => state)
	const socket = useContext(SocketContext)

	useEffect(() => {
		socket.on("getMessages", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});

		// return () => socket.off('getMessages')

	}, [socket])


	useEffect(() => {
		arrivalMessage &&
		access?.members.includes(arrivalMessage.sender) &&
		setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, access]);

	useEffect(() => {
		const getMessages = async () => {
			try{
				if (access === null) return

				const {data} = await axios.get(`/api/messages/${access?._id}`)
				setMessages(data)
			} catch (err) {
				console.log(err)
			}
		}

		getMessages()
	}, [access])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const message = {
			sender: auth.user._id,
			text: newMessage,
			conversationId: access._id,
		}

		const receiverId = access.members.find(member => member !== auth.user._id)

		socket.emit("sendMessage", {
			senderId: auth.user._id,
			receiverId,
			text: newMessage,
		});

		try {
			const res = await axios.post("/api/messages", message);
			setMessages([...messages, res.data]);
			setNewMessage("");
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='conversations'>
			{ access ? 
				<Fragment>
					<Top />
					<div className='contain__messages'>
						{messages.map((msg, index) => {
							return (
									<MessageDisplay
										key={index} 
										own={msg.sender === auth.user._id} 
										message={msg} 
									/>
							)
						})}
					</div>
					
					<form onSubmit={handleSubmit}>
						<input 
							type='text' 
							placeholder='Send message on enter' 
							className='chat__input' 
							value={newMessage} 
							onChange={e => setNewMessage(e.target.value)}
						/>
						<button type="submit" className="send_logo" 
						disabled={newMessage ? false : true}>
						</button>
					</form>
				</Fragment>
				: <span className='noConversation' >Open a conversation in Chats to start a chat.</span>
			}
			
		</div>
	)
}

export default Conversation;
