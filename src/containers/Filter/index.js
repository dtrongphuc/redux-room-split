import React from 'react';
import { connect } from 'react-redux';
import { DatePicker, Space, Select } from 'antd';
import moment from 'moment';

import { getMembersReducer } from '../../reducers/room';
import { getUserId } from '../../reducers/user';
const { Option } = Select;

const Filter = ({ members, currentUserId, onChangeDate, onSelectChange }) => {
	return (
		<div className='row'>
			<div className='col-12 col-md-4 d-flex align-items-center justify-content-end mt-2'>
				<Space direction='vertical' size={12}>
					<DatePicker
						picker='month'
						format='MM-YYYY'
						size='large'
						style={{ width: 160 }}
						defaultValue={moment()}
						onChange={onChangeDate}
						dropdownAlign={{
							points: ['tr', 'br'], // align dropdown top-right to bottom-right of input element
							offset: [0, 4], // align offset
							overflow: {
								adjustX: 0,
								adjustY: 0, // do not auto flip in y-axis
							},
						}}
					/>
				</Space>
			</div>
			<div className='col-12 col-md-8 d-flex align-items-center justify-content-end mt-2'>
				<Select
					size='large'
					defaultValue={currentUserId}
					style={{ width: 300 }}
					onChange={onSelectChange}
					loading={false}
				>
					{members.map((member) => (
						<Option value={member._id} key={member._id}>
							{member.realname}
						</Option>
					))}
				</Select>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	members: getMembersReducer(state.room),
	currentUserId: getUserId(state.user),
});

export default connect(mapStateToProps, null)(Filter);
