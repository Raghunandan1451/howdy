import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import access from './accessReducer'
import friend from './friendReducer'

export default combineReducers({
	auth,
	alert,
	access,
	friend
})