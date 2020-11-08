import * as types from '../actions/types';

const initialState = {
	room: {},
	members: [],
};

const room = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_ROOM_INFO:
			return {
				...state,
				room: action.payload,
			};
		case types.GET_MEMBERS:
			return {
				...state,
				members: action.payload,
			};
		case types.GET_TOTAL_EXPENSE:
			return {
				...state,
				totalExpense: action.payload,
			};
		default:
			return state;
	}
};

export const getRoomCode = (state) => state.room?.code;
export const getRoomId = (state) => state.room?._id;
export const getMembersReducer = (state) => state?.members;

export default room;
