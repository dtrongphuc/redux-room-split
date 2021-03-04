import * as types from '../actions/types';

const initialState = {
	isAuth: false,
	isFetching: false,
	errorMessage: '',
	user: {},
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case types.AUTH_REQUEST:
			return {
				...state,
				isAuth: false,
				isFetching: true,
			};
		case types.AUTH_RESPONSE:
			return {
				isAuth: true,
				isFetching: false,
				errorMessage: '',
				user: action.payload,
			};
		case types.RESPONSE_FAILED:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};
		case types.LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export const getRealName = (state) => state.user.realname;
export const getUserId = (state) => state.user._id;
export const getUserName = (state) => state.user.username;
export const getRoomId = (state) => state.user.room;
export const getIsAuth = (state) => state.isAuth;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
export const getAccountStatus = (state) => state.user.active;

export default user;
