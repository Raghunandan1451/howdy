import { GLOBALTYPES } from '../actions/globalTypes'

/**
 * Initial state for the alert reducer
 * @type {Object}
 */
const initialState = {}

/**
 * Alert reducer function
 * @param {Object} state - Current state of the alert reducer
 * @param {Object} action - Action object containing the type and payload
 * @returns {Object} - New state of the alert reducer
 */
const alertReducer = (state = initialState, action) => {
    switch (action.type){
        // If the action type is GLOBALTYPES.ALERT, return the action payload as the new state
        case GLOBALTYPES.ALERT:
            return action.payload;
        // If the action type is not GLOBALTYPES.ALERT, return the current state unchanged
        default:
            return state;
    }
}

export default alertReducer
