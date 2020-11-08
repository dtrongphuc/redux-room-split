import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { joinRoom } from '../../../actions';
import {
	getErrorMessage,
	getIsAuth,
	getIsFetching,
	getRoomId,
	getUserName,
} from '../../../reducers/user';
import { useHistory, Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { FaBarcode } from 'react-icons/fa';

import AsynButton from '../../../components/AsyncButton';
import { asyncButton } from '../utility';

const JoinRoom = ({
	joinRoom,
	isAuth,
	isLoading,
	username,
	roomId,
	errorMessage,
}) => {
	const TITLE = 'Tham gia phòng';

	var history = useHistory();

	useEffect(() => {
		asyncButton(isLoading);
		if (!isLoading && isAuth && roomId?.length > 0) {
			history.push('/');
		}
	}, [isLoading, isAuth, history, roomId]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const roomCode = data.get('code');
		joinRoom({ username, roomCode });
	};
	return (
		<>
			<h3 className='auth-right__title'>{TITLE}</h3>
			{!!errorMessage ? (
				<Alert variant='info'>{errorMessage}</Alert>
			) : null}
			<form className='auth-form' onSubmit={handleSubmit}>
				<div className='auth-right__group'>
					<span className='icon'>
						<FaBarcode />
					</span>
					<input
						type='text'
						name='code'
						placeholder='Mã phòng'
						autoComplete='off'
					/>
					<span className='focus-outline'></span>
				</div>

				<AsynButton
					classname='btn-auth__submit'
					content={TITLE}
					spinnerSize={12}
					loading={isLoading}
				/>
			</form>
			<Link
				to={{ pathname: '/create-room' }}
				className='auth-container__link mt-3'
			>
				Tạo phòng mới &#8594;
			</Link>
		</>
	);
};

const mapStateToProps = (state) => ({
	isAuth: getIsAuth(state.user),
	isLoading: getIsFetching(state.user),
	username: getUserName(state.user),
	roomId: getRoomId(state.user),
	errorMessage: getErrorMessage(state.user),
});

export default connect(mapStateToProps, { joinRoom })(JoinRoom);
