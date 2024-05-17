import { GLOBALTYPES } from "../actions/globalTypes";

/**
 * Access reducer
 * This reducer handles the state for the access token.
 * It updates the state when the ACCESS action is dispatched.
 * @param {Object} state - The current state of the access token. Initial state is null.
 * @param {Object} action - The action object containing the type and payload.
 * @returns {Object} - The updated state.
 */
const accessReducer = (state = null, action) => {
    switch (action.type){
        // If the action type is ACCESS, update the state with the payload.
        case GLOBALTYPES.ACCESS:
            return action.payload;
        // If the action type is not ACCESS, return the current state.
        default:
            return state;
    }
}

export default accessReducer
