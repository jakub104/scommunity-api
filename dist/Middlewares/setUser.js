'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../Database/Models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
		var token, decoded;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						token = req.header('auth-token');

						try {
							if (!token) {
								req.userId = '';
								req.userRole = '';
								next();
							} else {
								decoded = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);

								req.userId = decoded.id;
								req.userRole = decoded.role;
								next();
							}
						} catch (err) {
							req.invalidToken = err;
							console.log('Invalid Token: ', err);
							req.userId = '';
							req.userRole = '';
							next();
						}

					case 2:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();