
import { GLOBALTYPES } from "./globalTypes"

/**
 * This function is an action creator that dispatches an action to update the access state in the Redux store.
 * It takes in a parameter 'data' which is the data to be updated in the access state.
 * @param {Object} data - The data to be updated in the access state.
 * @return {Function} - The action creator function that dispatches an action to update the access state.
 */
export const access = (data) => async (dispatch) => {
	// Dispatch an action to update the access state in the Redux store
	dispatch({
		type: GLOBALTYPES.ACCESS,
		payload: data
	})
}
