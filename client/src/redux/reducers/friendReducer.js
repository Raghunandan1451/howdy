import { GLOBALTYPES } from '../actions/globalTypes'

/**
 * This is a reducer function for handling the friendId state in the Redux store.
 * It takes in the current state and an action, and returns the new state.
 * @param {string} state - The current friendId state. Initial state is an empty string.
 * @param {Object} action - The action object containing the type and payload.
 * @return {string} - The new friendId state.
 */
const friendIdReducer = (state = '', action) => {
    switch (action.type){
        // If the action type is GLOBALTYPES.FRIEND, update the state with the action payload
        case GLOBALTYPES.FRIEND:
            return action.payload;
        // If the action type is not GLOBALTYPES.FRIEND, return the current state
        default:
            return state;
    }
}

export default friendIdReducer
