import axios from 'axios'

export const getDataAPI = async (url, user) => {
	const {data: resp} = await axios.get(`/api/${url}/${user}`)
	return resp;
}

export const postDataAPI = async (url, post, token) => {
	const res = await axios.post(`/api/${url}`, post, {
		headers: { Authorization: token}
	})
	return res;
}

