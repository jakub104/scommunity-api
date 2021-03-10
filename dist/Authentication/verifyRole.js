"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (role) {
	return function (req, res, next) {
		if (req.userRole !== role) {
			return res.status(403).json({
				message: "You don't have the " + role + " role"
			});
		}
		next();
	};
};