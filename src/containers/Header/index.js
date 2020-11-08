import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FiMoreHorizontal } from 'react-icons/fi';
import { connect } from 'react-redux';

import { getUserName } from '../../reducers/user';
import logo from '../../logo.svg';
import avatar from '../../assets/images/avatar.jpg';
import api from '../../services/http';
import './style.scss';

const Header = ({ name }) => {
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<a
			href='/#'
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
		</a>
	));

	return (
		<div className='app-header'>
			<div className='container h-100'>
				<div className='d-flex align-items-center h-100'>
					<div className='app-header__left d-flex align-items-center h-100'>
						<a href='/' title='Trang chủ'>
							<img
								className='app-logo'
								src={logo}
								alt='room split logo'
							/>
						</a>
					</div>
					<div className='app-header__right h-100'>
						<div className='app-header__user'>
							<span className='user-text'>{name}</span>
							<img className='user-avatar' src={avatar} alt='' />
						</div>
						<div className='h-100 position-relative'>
							<Dropdown>
								<Dropdown.Toggle
									as={CustomToggle}
									menuAlign='left'
								>
									<FiMoreHorizontal
										fontSize='24'
										className='app-header__action'
									/>
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item
										href='/#'
										onClick={(event) => {
											event.preventDefault();
											api.logout()
												.then(() =>
													window.location.reload()
												)
												.catch((err) =>
													console.log(err)
												);
										}}
									>
										<p>Đăng xuất</p>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	name: getUserName(state.user),
});

export default connect(mapStateToProps, null)(Header);
