import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppContainer from '../../containers/App';
import Authenticate from '../../containers/Authenticate';
import PrivateRoute from '../PrivateRoute';
import { authResponse } from '../../actions';
import api from '../../services/http';

const App = () => {
	const dispatch = useDispatch();
	const [isFetched, setIsFetched] = useState(null);

	useEffect(() => {
		async function isLogged() {
			try {
				const res = await api.isAuth();
				dispatch(authResponse(res));
			} catch (error) {
				console.clear();
			} finally {
				setIsFetched(true);
			}
		}
		isLogged();
	}, [dispatch]);

	return (
		<Router>
			<Switch>
				<PrivateRoute
					exact
					path='/'
					component={AppContainer}
					isFetched={isFetched}
				/>
				<Route path='/' component={Authenticate} />
			</Switch>
		</Router>
	);
};

export default App;
