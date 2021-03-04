import React, { useState, useCallback, useEffect } from 'react';
import { Table, Button, Typography, Popconfirm } from 'antd';
import { FiPlus } from 'react-icons/fi';
import { RiDeleteBin4Line } from 'react-icons/ri';
import moment from 'moment';
import AddProduct from '../AddProduct';
import api from '../../services/http';
import { currencyFormat } from '../../utils';
import './style.scss';

const { Text } = Typography;

const HistoryTable = ({
	data,
	byId,
	currentUserId,
	loading,
	showNotify,
	fetchData,
	expense,
	payment,
}) => {
	const mapDataTable = useCallback(() => {
		return data.map((item, index) => {
			let itemData = {
				key: item._id,
				stt: index + 1,
				name: item.productName,
				date: moment(item.date).format('DD-MM-YYYY'),
				price: new Intl.NumberFormat('vi-VN', {
					style: 'currency',
					currency: 'VND',
				}).format(item.price),
				quantity: item.quantity,
				totalPrice: new Intl.NumberFormat('vi-VN', {
					style: 'currency',
					currency: 'VND',
				}).format(item.totalPrice),
				description: item.members.map((member) => (
					<Text code key={member.realname}>
						{member.realname}
					</Text>
				)),
			};
			return itemData;
		});
	}, [data]);
	const [addLoading, setAddLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [dataTable, setDataTable] = useState(mapDataTable());
	const [isEmpty, setIsEmpty] = useState(true);
	const [columns] = useState([
		{
			title: 'STT',
			dataIndex: 'stt',
			width: '54px',
		},
		{
			title: 'Sản phẩm',
			dataIndex: 'name',
		},
		{
			title: 'Thời gian',
			dataIndex: 'date',
			width: '100px',
		},
		{
			title: 'Giá',
			dataIndex: 'price',
		},
		{
			title: 'SL',
			dataIndex: 'quantity',
			width: '40px',
		},
		{
			title: 'Tổng tiền',
			dataIndex: 'totalPrice',
			sorter: (a, b) =>
				// eslint-disable-next-line
				Number(a.totalPrice.replace(/([^0-9\-])/g, '')) -
				// eslint-disable-next-line
				Number(b.totalPrice.replace(/([^0-9\-])/g, '')),
		},
		{
			title: 'Chức năng',
			dataIndex: 'operation',
			width: '80px',
			render: (text, record) => {
				return isEmpty && byId === currentUserId ? (
					<Popconfirm
						title='Chắc chắn xoá?'
						onConfirm={() => handleDelete(record.key)}
					>
						<Button
							icon={<RiDeleteBin4Line />}
							size='small'
							className='d-flex align-items-center'
						>
							Xoá
						</Button>
					</Popconfirm>
				) : null;
			},
		},
	]);

	useEffect(() => {
		const dt = mapDataTable();
		setDataTable(dt);
		if (dt.length > 0) {
			setIsEmpty(false);
		} else {
			setIsEmpty(true);
		}
	}, [mapDataTable]);

	const addProduct = async (values) => {
		setModalVisible(false);
		setAddLoading(true);
		try {
			await api.postProduct({
				...values,
				productDate: values.productDate.format('YYYY-MM-DD'),
				userID: currentUserId,
			});
			showNotify('Thêm thành công!', 'SUCCESS');
		} catch (e) {
			showNotify('Thêm không thành công, xảy ra lỗi!', 'WARNING');
		} finally {
			setAddLoading(false);
			fetchData();
		}
	};

	const handleDelete = async (productId) => {
		try {
			await api.deleteProduct({ productId });
			showNotify('Xoá thành công!', 'SUCCESS');
		} catch (err) {
			showNotify('Xoá không thành công!', 'WARNING');
		} finally {
			fetchData();
		}
	};

	const showModal = () => {
		setModalVisible(true);
	};

	return (
		<Table
			title={() => {
				return (
					<>
						<div className='d-flex align-items-center justify-content-between'>
							<Text strong className='table-header__text'>
								Sản phẩm đã mua
							</Text>
							<Button
								type='primary'
								icon={<FiPlus />}
								loading={addLoading}
								onClick={showModal}
							>
								Thêm sản phẩm
							</Button>
						</div>
						<AddProduct
							modalVisible={modalVisible}
							addProduct={addProduct}
							setModalVisible={setModalVisible}
						/>
					</>
				);
			}}
			dataSource={dataTable}
			columns={columns}
			size='middle'
			bordered={true}
			loading={loading}
			scroll={{ y: 250, x: 772 }}
			pagination={false}
			expandable={{
				rowExpandable: (record) => record.description.length !== 0,
				expandedRowRender: (record) => (
					<div className='d-flex align-items-center justify-content-start'>
						<p className='mb-0 mr-2'>Thành viên:</p>
						{record.description}
					</div>
				),
			}}
			footer={() => (
				<div className='d-flex align-items-center justify-content-end'>
					<Text strong className='mr-2'>
						Đã mua:
					</Text>
					<Text className='mr-3'>{currencyFormat(expense)}</Text>
					<Text strong className='mr-2'>
						Thanh toán:
					</Text>
					<Text>
						{(payment > 0 ? '+' : '') + currencyFormat(payment)}
					</Text>
				</div>
			)}
		/>
	);
};

export default HistoryTable;
