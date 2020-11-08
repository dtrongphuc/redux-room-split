import React from 'react';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';
import HashLoader from 'react-spinners/HashLoader';

import './style.scss';

const barLoaderStyle = css`
	display: inline-block;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	width: unset;
`;

const fullLoaderStyle = css`
	display: inline-block;
	position: fixed;
	top: 30%;
	left: 50%;
	width: unset;
	transform: translate(-50%, -50%);
`;

const Loader = ({ fullScreen }) => {
	return !!fullScreen ? (
		<div className='fullscreen-loader'>
			<HashLoader css={fullLoaderStyle} colors='#4158d0' size={130} />
			<p className='fullscreen-loader__text'>
				Đang khởi động server vui lòng chờ.
			</p>
		</div>
	) : (
		<BarLoader css={barLoaderStyle} color='#4158d0' />
	);
};

export default Loader;
