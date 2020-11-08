import http from './httpConfig';

class api {
	isAuth() {
		return new Promise((resolve, reject) => {
			http.post('/auth/isAuth')
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	login(username, password) {
		return new Promise((resolve, reject) => {
			http.post('/auth/login', { username, password })
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	logout() {
		return new Promise((resolve, reject) => {
			http.post('/auth/logout')
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	register(realname, username, password, passwordConfirm) {
		return new Promise((resolve, reject) => {
			http.post('/auth/register', {
				realname,
				username,
				password,
				passwordConfirm,
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	createRoom(data) {
		return new Promise((resolve, reject) => {
			http.post('/auth/create', data)
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	joinRoom(data) {
		return new Promise((resolve, reject) => {
			http.post('/auth/join', data)
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	getHistoryById(id, month, year) {
		return new Promise((resolve, reject) => {
			http.get(`/get/history/id`, {
				params: {
					id,
					month,
					year,
				},
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	getRoomInfo(id) {
		return new Promise((resolve, reject) => {
			http.get(`/get/room`, {
				params: {
					id,
				},
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	getMembers(id) {
		return new Promise((resolve, reject) => {
			http.get(`/get/members/room`, {
				params: {
					id,
				},
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	getTotalExpense(id, month, year) {
		return new Promise((resolve, reject) => {
			http.get(`/get/total-expense`, {
				params: {
					id,
					month,
					year,
				},
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	getExpenseById(roomId, userId, month, year) {
		return new Promise((resolve, reject) => {
			http.get(`/get/expense`, {
				params: {
					roomId,
					userId,
					month,
					year,
				},
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	getPaymentById(roomId, userId, month, year) {
		return new Promise((resolve, reject) => {
			http.get(`/get/payment`, {
				params: {
					roomId,
					userId,
					month,
					year,
				},
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	postProduct(data) {
		return new Promise((resolve, reject) => {
			http.post(`/add/product`, data)
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	deleteProduct({ productId }) {
		return new Promise((resolve, reject) => {
			http.post(`/delete/product`, { productId })
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}
}

export default new api();
