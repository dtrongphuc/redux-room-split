import React from 'react';
import { ConfigProvider } from 'antd';
import 'moment/locale/vi';
import locale from 'antd/es/locale/vi_VN';

import Header from '../Header';
import Body from '../Body';

const AppContainer = () => {
	return (
		<ConfigProvider locale={locale}>
			<Header />
			<Body />
		</ConfigProvider>
	);
};

export default AppContainer;
