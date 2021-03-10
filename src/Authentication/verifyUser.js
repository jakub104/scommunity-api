export default async (req, res, next) => {
	if (req.invalidToken) {
		return res.status(400).json({
			message: 'Invalid token'
		})
	}
	else if (!req.userId) {
		return res.status(401).json({
			message: 'You don\'t logged in'
		})
	}
	else {
		next()
	}
}