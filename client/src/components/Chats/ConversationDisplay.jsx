import axios from 'axios'; // Importing axios for making API calls
import { useState, useEffect } from 'react'; // Importing useState and useEffect for state management
import { useDispatch } from 'react-redux'; // Importing useDispatch from react-redux

import './chat.css'; // Importing CSS styles
import { GLOBALTYPES } from '../../redux/actions/globalTypes'; // Importing GLOBALTYPES from globalTypes

/**
 * Conversation Component
 * @param {Object} props - The props object containing the members and currUser parameters
 * @returns {JSX.Element} - The rendered Conversation component
 */
function Conversation({ members, currUser }) {
	const [user, setUser] = useState(null); // Initializing user state
	const dispatch = useDispatch(); // Getting the dispatch function from react-redux

	// useEffect hook to fetch user data when currUser or members change
	useEffect(() => {
		const friendId = members.find((id) => id !== currUser); // Finding the friendId

		const getUser = async () => {
			try {
				const res = await axios.get(`/api/user?userId=${friendId}`); // Making API call to get user data
				setUser(res.data); // Setting user state
			} catch (err) {
				console.log(err);
			}
		};

		getUser();
	}, [currUser, members]);

	// Function to handle click event
	const handleClick = (e) => {
		e.preventDefault();
		dispatch({
			type: GLOBALTYPES.FRIEND, // Dispatching action to update friend state
			payload: e.target.getAttribute('friend_id'), // Getting friend_id attribute from clicked element
		});
	};

	return (
		<div className='list__design' friend_id={members[1]} onClick={handleClick}>
			{user?.username} // Rendering user's username
		</div>
	);
}

export default Conversation;
