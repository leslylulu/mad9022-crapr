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

/**
 * Calculate distance between two geographic coordinates using the Haversine formula
 * @param {number} lat1 - First latitude in decimal degrees
 * @param {number} lon1 - First longitude in decimal degrees
 * @param {number} lat2 - Second latitude in decimal degrees
 * @param {number} lon2 - Second longitude in decimal degrees
 * @returns {number} Distance in meters
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
	// Earth's radius in meters
	const R = 6371000;

	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;

	return distance;
}

function toRad(degrees) {
	return degrees * Math.PI / 180;
}

export default isCurrentUser;
export { calculateDistance}