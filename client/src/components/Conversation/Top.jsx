import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Top() {

	const [friendname, setFriendname] = useState(null)
	const friend = useSelector(state => state.friend)

	useEffect(() => {
		const getFriend = async () => {
			try {
				let resp = await axios.get(`/api/user?userId=${friend}`);
				setFriendname(resp.data);
			} catch (error) {
				console.log(error)
			}
		}

		getFriend()
	}, [friend])
	return (
		<div className='username__bar'>
			{friendname?.username}
		</div>
	)
}

export default Top
