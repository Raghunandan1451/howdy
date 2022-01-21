
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


import { access } from '../../redux/actions/accessAction';
import { getDataAPI } from '../../utils/fetchData';
import './chat.css';
import Conversation from './ConversationDisplay';

function ChatList() {

	const [chatContacts, setChatContacts] = useState([]);
	const {auth} = useSelector(state => state)
	const dispatch = useDispatch()

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await getDataAPI('conversations', auth.user._id)
				setChatContacts(res)
			} catch (error) {
				console.log(error)
			}
		}
		
		getConversations();
	}, [auth])

	return (
		<div className="chat__list">
			{chatContacts.map((list, index) => {
				return (
					<div 
						style={{position: 'relative'}} 
						key={index} 
						onClick={() => dispatch(access(list))}
					>
						<Conversation 
							members={list?.members} 
							currUser={auth.user._id} 
						/>
					</div>
				)
			})}
		</div>
	);
}

export default ChatList;
