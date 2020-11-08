export const currencyFormat = (numberStr) => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(numberStr);
};
