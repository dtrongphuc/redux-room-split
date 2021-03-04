import React from 'react';
import {
	Form,
	Input,
	InputNumber,
	DatePicker,
	Row,
	Col,
	Checkbox,
	Modal,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import { getMembersReducer } from '../../reducers/room';
import './style.scss';

const AddProduct = ({ modalVisible, setModalVisible, members, addProduct }) => {
	const layout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 18,
		},
	};

	const middleLayout = {
		labelCol: {
			span: 12,
		},
		wrapperCol: {
			span: 12,
		},
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	const onSubmit = async (values) => {
		await addProduct(values);
	};

	const [form] = Form.useForm();
	return (
		<Modal
			width={600}
			visible={modalVisible}
			title='Thêm sản phẩm'
			okText='Thêm'
			cancelText='Huỷ'
			onCancel={handleCancel}
			onOk={() => {
				form.validateFields()
					.then((values) => {
						form.resetFields();
						onSubmit(values);
					})
					.catch((info) => {
						console.log('Validate Failed:', info);
					});
			}}
		>
			<Form
				{...layout}
				form={form}
				name='form_add_product'
				initialValues={{
					modifier: 'public',
					productDate: moment(),
					productQuantity: 1,
					members: members
						.filter((member) => member.active === true)
						.map((member) => member._id),
				}}
			>
				<Form.Item
					label='Tên sản phẩm'
					name='productName'
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập tên sản phẩm!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Row>
					<Col span={12}>
						<Form.Item
							{...middleLayout}
							label='Giá'
							name='productPrice'
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập giá tiền!',
								},
							]}
						>
							<InputNumber
								min={0}
								formatter={(value) =>
									`$ ${value}`.replace(
										/\B(?=(\d{3})+(?!\d))/g,
										','
									)
								}
								p
								arser={(value) =>
									value.replace(/\$\s?|(,*)/g, '')
								}
								step={1000}
							/>
						</Form.Item>
					</Col>
					<Col span={11} className='ml-auto'>
						<Form.Item
							{...middleLayout}
							label='Số lượng'
							name='productQuantity'
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập số lượng!',
								},
							]}
						>
							<InputNumber min={1} />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item
					label='Ngày'
					name='productDate'
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập ngày!',
						},
					]}
				>
					<DatePicker
						id='formProductDate'
						picker='date'
						format='DD-MM-YYYY'
					/>
				</Form.Item>
				<Form.Item name='members' label='Tham gia'>
					<Checkbox.Group>
						<Row>
							{members.map((member, index) => (
								<Col span={12} key={index + 1}>
									<Checkbox
										value={member._id}
										style={{ lineHeight: '32px' }}
									>
										{member.realname}
									</Checkbox>
								</Col>
							))}
						</Row>
					</Checkbox.Group>
				</Form.Item>
			</Form>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	members: getMembersReducer(state.room),
});

export default connect(mapStateToProps, null)(AddProduct);
