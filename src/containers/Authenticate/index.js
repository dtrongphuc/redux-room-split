import React from 'react';
import { Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import './style.scss';

const Authenticate = () => {
	return (
		<div className='auth'>
			<div className='auth-container'>
				<div className='row'>
					<div className='col-lg-6 d-none d-lg-block d-xl-block'>
						<div className='auth-container__left'></div>
					</div>
					<div className='col-lg-6 col-12'>
						<div className='auth-container__right'>
							<Route exact path='/login' component={Login} />
							<Route
								exact
								path='/register'
								component={Register}
							/>
							<Route
								exact
								path='/create-room'
								component={CreateRoom}
							/>
							<Route
								exact
								path='/join-room'
								component={JoinRoom}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Authenticate;
