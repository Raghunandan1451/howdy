import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { access } from '../../redux/actions/accessAction'; // Importing the access action
import { getDataAPI } from '../../utils/fetchData'; // Importing the API fetching function
import './chat.css';
import Conversation from './ConversationDisplay';

/**
 * The ChatList component displays a list of chat conversations
 * based on the authenticated user's conversations.
 */
function ChatList() {

	const [chatContacts, setChatContacts] = useState([]); // State to store the list of chat conversations
	const {auth} = useSelector(state => state); // Getting the authenticated user's data from the Redux store
	const dispatch = useDispatch(); // Getting the dispatch function from Redux

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await getDataAPI('conversations', auth.user._id); // Fetching the list of conversations using the API
				setChatContacts(res); // Updating the state with the fetched conversations
			} catch (error) {
				console.log(error);
			}
		};
		
		getConversations();
	}, [auth]); // Re-fetching the conversations when the authenticated user changes

	return (
		<div className="chat__list">
			{chatContacts.map((list, index) => {
				return (
					<div 
						style={{position: 'relative'}} 
						key={index} 
						onClick={() => dispatch(access(list))} // Dispatching the access action when a conversation is clicked
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
