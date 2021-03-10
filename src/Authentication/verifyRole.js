export default (role) => {
	return (req, res, next) => {
		if (req.userRole !== role) {
			return res.status(403).json({
				message: `You don't have the ${role} role`
			})
		}
		next()
	}
}