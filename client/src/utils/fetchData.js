import axios from 'axios'

/**
 * Function to make a GET request to the server API
 * @param {string} url - The API endpoint to request
 * @param {string} user - The user ID to append to the API endpoint
 * @returns {Promise} - A promise that resolves to the API response data
 */
export const getDataAPI = async (url, user) => {
	const {data: resp} = await axios.get(`/api/${url}/${user}`)
	return resp;
}

/**
 * Function to make a POST request to the server API
 * @param {string} url - The API endpoint to request
 * @param {Object} post - The data to send in the request body
 * @param {string} token - The user's authorization token
 * @returns {Promise} - A promise that resolves to the API response
 */
export const postDataAPI = async (url, post, token) => {
	const res = await axios.post(`/api/${url}`, post, {
		headers: { Authorization: token}
	})
	return res;
}
