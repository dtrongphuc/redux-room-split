import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getRoomCode, getRoomId } from '../../reducers/room';
import { getRoomInfoAndMembers } from '../../actions';
import { getUserId } from '../../reducers/user';

import Filter from '../../containers/Filter';
import HistoryTable from '../HistoryTable';
import MiniLoading from '../../components/MiniLoading';
import api from '../../services/http';
import { currencyFormat } from '../../utils.js';

import './style.scss';
const { Paragraph } = Typography;

const Body = ({ code, roomId, getRoomInfoAndMembers, currentUserId }) => {
	const [loading, setLoading] = useState(false);
	const [month, setMonth] = useState(moment().format('M'));
	const [year, setYear] = useState(moment().format('YYYY'));
	const [dataTable, setDataTable] = useState([]);
	const [byId, setById] = useState(currentUserId);
	const [totalExpense, setTotalExpense] = useState(0);
	const [expense, setExpense] = useState(0);
	const [payment, setPayment] = useState(0);

	useEffect(() => {
		getRoomInfoAndMembers();
	}, [getRoomInfoAndMembers]);

	useEffect(() => {
		roomId && getTotalExpense(roomId, month, year);
	}, [roomId, month, year]);

	useEffect(() => {
		getHistoryById(byId, month, year);
		roomId && expenseById(roomId, byId, month, year);
		roomId && paymentById(roomId, byId, month, year);
	}, [roomId, byId, month, year]);

	const getHistoryById = async (id, month, year) => {
		try {
			setLoading(true);
			const data = await api.getHistoryById(id, month, year);
			setDataTable(data);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const getTotalExpense = async (roomId, month, year) => {
		try {
			setLoading(true);

			const { totalExpense } = await api.getTotalExpense(
				roomId,
				month,
				year
			);
			setTotalExpense(totalExpense);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const expenseById = async (roomId, userId, month, year) => {
		try {
			setLoading(true);
			const { expense } = await api.getExpenseById(
				roomId,
				userId,
				month,
				year
			);
			setExpense(expense);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const paymentById = async (roomId, userId, month, year) => {
		try {
			setLoading(true);
			const { payment } = await api.getPaymentById(
				roomId,
				userId,
				month,
				year
			);
			setPayment(payment);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const fetchData = () => {
		console.log('fetch', roomId);
		roomId && getTotalExpense(roomId, month, year);
		roomId && expenseById(roomId, byId, month, year);
		roomId && paymentById(roomId, byId, month, year);
		byId && getHistoryById(byId, month, year);
	};

	const onChangeDate = (date, dateString) => {
		if (dateString) {
			let selected = dateString.split('-');
			setMonth(selected[0]);
			setYear(selected[1]);
		}
	};

	const onSelectChange = (value) => {
		setById(value);
	};

	const showNotify = (str, type) => {
		const config = {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		};
		switch (type) {
			case 'SUCCESS':
				return toast.success(str, config);
			default:
				return toast.warning(str, config);
		}
	};

	return !!roomId ? (
		<div className='app-body'>
			<div className='container'>
				<div className='d-inline-flex'>
					<p className='app-body__text app-body__text--opaque mr-2'>
						Mã phòng:
					</p>
					{!!code ? (
						<Paragraph
							className='app-body__text app-body__text--opaque mb-0'
							copyable
						>
							{code}
						</Paragraph>
					) : (
						<MiniLoading />
					)}
				</div>

				<div className='d-flex align-items-center justify-center-start mt-2'>
					<p className='app-body__text app-body__text--opaque mr-2'>
						Chi tiêu trong tháng:
					</p>
					<p className='app-body__text app-body__text--opaque'>
						{currencyFormat(totalExpense)}
					</p>
				</div>
				<div className='d-flex align-items-center justify-content-end'>
					<Filter
						onChangeDate={onChangeDate}
						onSelectChange={onSelectChange}
					/>
				</div>
				<div className='app-body__table mt-3'>
					<HistoryTable
						data={dataTable}
						byId={byId}
						currentUserId={currentUserId}
						loading={loading}
						showNotify={showNotify}
						fetchData={fetchData}
						payment={payment}
						expense={expense}
					/>
				</div>
				<ToastContainer />
			</div>
		</div>
	) : null;
};

const mapStateToProps = (state) => ({
	code: getRoomCode(state.room),
	roomId: getRoomId(state.room),
	currentUserId: getUserId(state.user),
});

export default connect(mapStateToProps, { getRoomInfoAndMembers })(Body);
