import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

/**
 * Top component for displaying the username of the current conversation.
 * It fetches the user data from the server based on the current friend ID.
 */
function Top() {
	// State to store the friend's username
	const [friendname, setFriendname] = useState(null)

	// Get the current friend ID from the Redux store
	const friend = useSelector(state => state.friend)

	// Fetch the friend's data when the friend ID changes
	useEffect(() => {
		const getFriend = async () => {
			try {
				// Make a GET request to the server to get the friend's data
				let resp = await axios.get(`/api/user?userId=${friend}`);
				setFriendname(resp.data);
			} catch (error) {
				console.log(error)
			}
		}

		getFriend()
	}, [friend])

	// Render the friend's username
	return (
		<div className='username__bar'>
			{friendname?.username}
		</div>
	)
}

export default Top
