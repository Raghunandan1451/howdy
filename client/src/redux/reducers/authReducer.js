import { GLOBALTYPES } from '../actions/globalTypes' // Importing global types for action types

// Initial state of the authReducer
const initialState = {}

/**
 * Auth reducer function
 * @param {Object} state - The current state of the authReducer
 * @param {Object} action - The action object containing the type and payload
 * @returns {Object} - The new state of the authReducer
 */
const authReducer = (state = initialState, action) => {
    switch (action.type){
        // If the action type is GLOBALTYPES.AUTH, update the state with the payload
        case GLOBALTYPES.AUTH:
            return action.payload;
        // If the action type is not GLOBALTYPES.AUTH, return the current state
        default:
            return state;
    }
}

export default authReducer // Exporting the authReducer function
