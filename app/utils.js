import jwt from 'jsonwebtoken';

const isCurrentUser = (token, id) => {
	try {
		const decoded = jwt.decode(token, { complete: true });
		if (decoded?.payload?.id === id) {
			return true;
		}
		return false;
	} catch (error) {
		console.error('Error decoding token:', error);
		return false;
	}
};

export default isCurrentUser;