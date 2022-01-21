import axios from 'axios';
import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'

import './chat.css'
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

function Conversation({members, currUser}) {

	const [user, setUser] = useState(null)
	const dispatch = useDispatch()

	
	useEffect(() => {

		const friendId = members.find((id) => id !== currUser);

		const getUser = async () => {
			try {
				const res = await axios.get(`/api/user?userId=${friendId}`);
				setUser(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		getUser();
	}, [currUser, members])


	const handleClick = (e) => {
		e.preventDefault();
		dispatch({
			type: GLOBALTYPES.FRIEND,
			payload: e.target.getAttribute('friend_id')
		})
	}

	return (
		<div className='list__design' friend_id={members[1]} onClick={handleClick} >
			{user?.username}
		</div>
	)
}

export default Conversation
