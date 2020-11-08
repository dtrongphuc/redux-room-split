import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { getIsFetching, getIsAuth } from '../../reducers/user';
import Loader from '../Loader';

const PrivateRoute = ({
	component: Component,
	isFetched,
	isLoading,
	isAuth,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isFetched !== null && !isLoading ? (
					isAuth ? (
						<Component {...props} />
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location },
							}}
						/>
					)
				) : (
					<Loader fullScreen={true} />
				)
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	isLoading: getIsFetching(state.user),
	isAuth: getIsAuth(state.user),
});

export default connect(mapStateToProps, null)(PrivateRoute);
