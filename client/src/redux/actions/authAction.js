import { GLOBALTYPES } from './globalTypes'
import { postDataAPI } from '../../utils/fetchData'
import valid from '../../utils/valid'


/**
 * Login action
 * @param {Object} data - The data object containing the username and password
 * @returns {Function} - The dispatch function
 */
export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} }) // Dispatch loading state
        const res = await postDataAPI('login', data) // Send login request
        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.access_token,
                user: res.data.user
            } 
        }) // Dispatch auth state with access token and user data

        localStorage.setItem("firstLogin", true) // Set local storage flag for first login
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.msg
            } 
        }) // Dispatch success state with message
        
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        }) // Dispatch error state with error message
    }
}


/**
 * Refresh token action
 * @returns {Function} - The dispatch function
 */
export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if(firstLogin){
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} }) // Dispatch loading state

        try {
            const res = await postDataAPI('refresh_token') // Send refresh token request
            dispatch({ 
                type: GLOBALTYPES.AUTH, 
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                } 
            }) // Dispatch auth state with access token and user data

            dispatch({ type: GLOBALTYPES.ALERT, payload: {} }) // Dispatch empty state to clear loading state

        } catch (err) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: {
                    error: err.response.data.msg
                } 
            }) // Dispatch error state with error message
        }
    }
}

/**
 * Register action
 * @param {Object} data - The data object containing the username, email, and password
 * @returns {Function} - The dispatch function
 */
export const register = (data) => async (dispatch) => {
    const check = valid(data)
    if(check.errLength > 0)
    return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg}) // Dispatch error state with validation errors

    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        const res = await postDataAPI('register', data) // Send register request
        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.access_token,
                user: res.data.user
            } 
        }) // Dispatch auth state with access token and user data

        localStorage.setItem("firstLogin", true) // Set local storage flag for first login
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.msg
            } 
        }) // Dispatch success state with message
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        }) // Dispatch error state with error message
    }
}


/**
 * Logout action
 * @returns {Function} - The dispatch function
 */
export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin') // Remove local storage flag for first login
        await postDataAPI('logout') // Send logout request
        window.location.href = "/" // Redirect to login page
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        }) // Dispatch error state with error message
    }
}
