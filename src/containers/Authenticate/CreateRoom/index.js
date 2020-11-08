import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createRoom } from '../../../actions';
import {
	getErrorMessage,
	getIsAuth,
	getIsFetching,
	getRoomId,
	getUserName,
} from '../../../reducers/user';
import { useHistory, Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { FaTag, FaDollarSign } from 'react-icons/fa';

import AsynButton from '../../../components/AsyncButton';
import { asyncButton } from '../utility';

const CreateRoom = ({
	createRoom,
	isAuth,
	isLoading,
	username,
	roomId,
	errorMessage,
}) => {
	const TITLE = 'Tạo phòng';

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
		const roomName = data.get('roomname');
		const price = data.get('price');
		const otherPrice = data.get('otherprice');

		createRoom({ username, roomName, price, otherPrice });
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
						<FaTag />
					</span>
					<input
						type='text'
						name='roomname'
						placeholder='Tên phòng'
						required
						autoComplete='off'
					/>
					<span className='focus-outline'></span>
				</div>
				<div className='auth-right__group'>
					<span className='icon'>
						<FaDollarSign />
					</span>
					<input
						type='text'
						name='price'
						placeholder='Giá phòng'
						required
						autoComplete='off'
					/>
					<span className='focus-outline'></span>
				</div>
				<div className='auth-right__group'>
					<span className='icon'>
						<FaDollarSign />
					</span>
					<input
						type='text'
						name='otherprice'
						placeholder='Tiền khác'
						required
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
				to={{ pathname: '/join-room' }}
				className='auth-container__link mt-3'
			>
				Tham gia phòng đã có &#8594;
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

export default connect(mapStateToProps, { createRoom })(CreateRoom);
