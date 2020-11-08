import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../actions';
import {
	getErrorMessage,
	getIsAuth,
	getIsFetching,
} from '../../../reducers/user';
import { Alert } from 'react-bootstrap';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import AsynButton from '../../../components/AsyncButton';
import { asyncButton } from '../utility';

const Login = ({ login, isAuth, isLoading, errorMessage }) => {
	// state

	var history = useHistory();

	useEffect(() => {
		asyncButton(isLoading);
		if (!isLoading && isAuth) {
			history.push('/');
		}
	}, [isLoading, isAuth, history]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const username = data.get('username');
		const password = data.get('password');
		login({ username, password });
	};

	return (
		<>
			<h3 className='auth-right__title'>Đăng nhập</h3>
			{!!errorMessage ? (
				<Alert variant='info'>{errorMessage}</Alert>
			) : null}
			<form className='auth-form' onSubmit={handleSubmit}>
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
				<AsynButton
					classname='btn-auth__submit'
					content='Đăng nhập'
					spinnerSize={12}
					loading={isLoading}
				/>
				<div className='auth-right__group'>
					<a href='/' className='auth-container__link'>
						Quên mật khẩu?
					</a>
				</div>
			</form>
			<a href='/register' className='auth-container__link mt-3'>
				Tạo tài khoản của bạn &#8594;
			</a>
		</>
	);
};

const mapStateToProps = (state) => ({
	isAuth: getIsAuth(state.user),
	isLoading: getIsFetching(state.user),
	errorMessage: getErrorMessage(state.user),
});

export default connect(mapStateToProps, { login })(Login);
