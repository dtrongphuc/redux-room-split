import React from 'react';
import { connect } from 'react-redux';
import { getUserId, getAccountStatus } from '../../reducers/user';
import api from '../../services/http';

import './style.scss';

const SwitchActive = ({ userId, active }) => {
	const handleSwitch = async () => {
		let checkbox = document.querySelector('.switch-input');
		if (!!checkbox) {
			checkbox.checked = !checkbox.checked;
			try {
				const res = await api.updateAccountStatus(
					userId,
					checkbox.checked
				);
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className='switch' onClick={handleSwitch}>
			<input
				type='checkbox'
				name='switch-active'
				className='switch-input'
				checked={active}
				readOnly={true}
			/>
			<label htmlFor='switch-active' className='btn-switch'></label>
		</div>
	);
};

const mapStateToProps = (state) => ({
	userId: getUserId(state.user),
	active: getAccountStatus(state.user),
});

export default connect(mapStateToProps, null)(SwitchActive);
