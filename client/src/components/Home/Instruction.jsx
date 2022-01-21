
import React, { Fragment } from 'react'
// import { useSelector } from 'react-redux'

function Instruction() {

	// const {auth} = useSelector(state => state)
	// const [online, setOnline] = useState([]);

	// useEffect(() => {
	// 	const getOnlineUsers = () => {
	// 		try {
	// 			onlineUsers.forEach(async (socketUsers, index) => {
	// 				if(socketUsers.userId !== auth.user._id) {
	// 					const resp = await axios.get(`/api/user?userId=${socketUsers.userId}`)
	// 					setOnline(resp.data);
	// 				}
	// 			})
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	getOnlineUsers();
	// }, [onlineUsers, auth]);


	return (
		<div className='instruction'>
			<Fragment>
				<h2 className='header__design' >Instruction</h2>
				<div className="instruction__list">
					<ul type='none'>
						<li className='instruction__line'>When you select any user from Contact List it will be appended to Chat List</li>
						<li className='instruction__line'>You can chat with users after slecting users from chat list</li>
						<li className='instruction__line'>Don't send messages to users who are offline</li>
					</ul>
				</div>
			</Fragment>
			<Fragment>
				<h2 className='header__design'>Need Update</h2>
				<div className="list__design">
					<div className="instruction__line">
						Still need to update to fetch online Users
					</div>
				</div>
			</Fragment>
		</div>
	)
}

export default Instruction
