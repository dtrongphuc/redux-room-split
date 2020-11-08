import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { register } from '../../../actions';
import {
	getErrorMessage,
	getIsAuth,
	getIsFetching,
	getRoomId,
} from '../../../reducers/user';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { FaUserAlt, FaLock, FaUserTag } from 'react-icons/fa';

import AsynButton from '../../../components/AsyncButton';
import { asyncButton } from '../utility';

const Register = ({ register, isAuth, isLoading, errorMessage, roomID }) => {
	// state
	var history = useHistory();

	useEffect(() => {
		asyncButton(isLoading);
		if (!isLoading && isAuth && roomID?.length === 0) {
			history.push('/create-room');
		}
	}, [isLoading, isAuth, history, roomID]);

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const realname = data.get('realname');
		const username = data.get('username');
		const password = data.get('password');
		const passwordConfirm = data.get('passwordConfirm');

		register({ realname, username, password, passwordConfirm });
	};

	return (
		<>
			<h3 className='auth-right__title'>Đăng ký</h3>
			{!!errorMessage ? (
				<Alert variant='info'>{errorMessage}</Alert>
			) : null}
			<form className='auth-form' onSubmit={handleSubmit}>
				<div className='auth-right__group'>
					<span className='icon'>
						<FaUserTag fontSize={20} />
					</span>
					<input
						type='text'
						name='realname'
						placeholder='Họ tên'
						required
						autoComplete='off'
					/>
					<span className='focus-outline'></span>
				</div>
				<div className='auth-right__group'>
					<span className='icon'>
						<FaUserAlt />
					</span>
					<input
						type='text'
						name='username'
						placeholder='Tên đăng nhập'
						required
						autoComplete='off'
					/>
					<span className='focus-outline'></span>
				</div>
				<div className='auth-right__group'>
					<span className='icon'>
						<FaLock />
					</span>
					<input
						type='password'
						name='password'
						placeholder='Mật khẩu'
						required
					/>
					<span className='focus-outline'></span>
				</div>
				<div className='auth-right__group'>
					<span className='icon'>
						<FaLock />
					</span>
					<input
						type='password'
						name='passwordConfirm'
						placeholder='Xác nhận mật khẩu'
						required
					/>
					<span className='focus-outline'></span>
				</div>
				<AsynButton
					classname='btn-auth__submit'
					content='Đăng ký'
					spinnerSize={12}
					loading={isLoading}
				/>
			</form>
			<a href='/login' className='auth-container__link mt-3'>
				Đăng nhập tài khoản của bạn &#8594;
			</a>
		</>
	);
};

const mapStateToProps = (state) => ({
	isAuth: getIsAuth(state.user),
	isLoading: getIsFetching(state.user),
	roomID: getRoomId(state.user),
	errorMessage: getErrorMessage(state.user),
});

export default connect(mapStateToProps, { register })(Register);
