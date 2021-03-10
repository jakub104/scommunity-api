import jwt from 'jsonwebtoken'
import User from '@/Database/Models/User'

export default async (req, res, next) => {
	const token = req.header('auth-token')
	try {
		if (!token) {
			req.userId = ''
			req.userRole = ''
			next()
		}
		else {
			const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
			req.userId = decoded.id
			req.userRole = decoded.role
			next()
		}
	}
	catch (err) {
		req.invalidToken = err
		console.log('Invalid Token: ', err);
		req.userId = ''
		req.userRole = ''
		next()
	}
}