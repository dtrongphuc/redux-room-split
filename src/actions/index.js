import * as types from './types';
import api from '../services/http';

const authRequest = () => ({
	type: types.AUTH_REQUEST,
	payload: '',
});

export const authResponse = (data) => ({
	type: types.AUTH_RESPONSE,
	payload: data.user,
});

const responseFailed = (message) => ({
	type: types.RESPONSE_FAILED,
	payload: message,
});

export const login = (data) => (dispatch) => {
	dispatch(authRequest());
	const { username, password } = data;
	return api
		.login(username, password)
		.then((res) => dispatch(authResponse(res)))
		.catch((error) => dispatch(responseFailed(error?.error?.message)));
};

export const register = (data) => (dispatch) => {
	dispatch(authRequest());
	const { realname, username, password, passwordConfirm } = data;
	return api
		.register(realname, username, password, passwordConfirm)
		.then((res) => dispatch(authResponse(res)))
		.catch((error) => dispatch(responseFailed(error?.error?.message)));
};

export const createRoom = (data) => (dispatch) => {
	dispatch(authRequest());
	return api
		.createRoom(data)
		.then((res) => dispatch(authResponse(res)))
		.catch((error) => dispatch(responseFailed(error?.error?.message)));
};

export const joinRoom = (data) => (dispatch) => {
	dispatch(authRequest());
	return api
		.joinRoom(data)
		.then((res) => dispatch(authResponse(res)))
		.catch((error) => dispatch(responseFailed(error?.error?.message)));
};

const getRoomInfo = (id) => {
	return api.getRoomInfo(id);
};

const getMembers = (id) => {
	return api.getMembers(id);
};

export const getRoomInfoAndMembers = () => (dispatch, getState) => {
	const { user } = getState();
	const id = user?.user?.room;

	return Promise.all([getRoomInfo(id), getMembers(id)])
		.then(([roomInfo, members]) => {
			dispatch({
				type: types.GET_ROOM_INFO,
				payload: roomInfo.room,
			});
			dispatch({
				type: types.GET_MEMBERS,
				payload: members.members,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
