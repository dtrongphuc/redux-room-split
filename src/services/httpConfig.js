import axios from 'axios';
require('dotenv').config();

const http = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		'content-type': 'application/json',
	},
	timeout: 60000,
	withCredentials: true,
});

http.interceptors.request.use(
	function (config) {
		//before request sent
		return config;
	},
	function (error) {
		// request error
		console.log('request error: ', error);
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	function (response) {
		// Do something with response data
		return response?.data;
	},
	async function (error) {
		if (error.response && error.response.status === 401) {
			try {
				await http.get('/auth/refresh-token');
				return http(error.config);
			} catch (err) {
				return Promise.reject(err);
			}
		}
		return Promise.reject(error.response?.data);
	}
);

export default http;
