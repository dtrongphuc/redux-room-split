import { combineReducers } from 'redux';
import user from './user';
import room from './room';

export default combineReducers({
	user,
	room,
});
