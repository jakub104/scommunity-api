'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../Database/Models/User');

var _User2 = _interopRequireDefault(_User);

var _validation = require('../validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.post('/register', function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
		var _req$body, nick, gender, locale, password, error, nickExist, salt, hashedPassword, userModel, user, token;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_req$body = req.body, nick = _req$body.nick, gender = _req$body.gender, locale = _req$body.locale, password = _req$body.password;
						// Validate

						error = (0, _validation.registerValidation)(req.body).error;

						if (!error) {
							_context.next = 4;
							break;
						}

						return _context.abrupt('return', res.status(400).json(error));

					case 4:
						_context.next = 6;
						return _User2.default.findOne({ nick: nick });

					case 6:
						nickExist = _context.sent;

						if (!nickExist) {
							_context.next = 9;
							break;
						}

						return _context.abrupt('return', res.status(400).json({
							success: false,
							message: 'Nick already exists!'
						}));

					case 9:
						_context.next = 11;
						return _bcryptjs2.default.genSalt(10);

					case 11:
						salt = _context.sent;
						_context.next = 14;
						return _bcryptjs2.default.hash(password, salt);

					case 14:
						hashedPassword = _context.sent;


						// Create User
						userModel = new _User2.default({
							info: {
								nick: nick,
								avatar: gender === 'male' ? 'https://firebasestorage.googleapis.com/v0/b/szulcus-community.appspot.com/o/male.png?alt=media&token=b86299d3-b943-4ca3-8a5d-766cf47a52ae' : 'https://firebasestorage.googleapis.com/v0/b/szulcus-community.appspot.com/o/female.png?alt=media&token=f8d1484a-becf-414b-8b1f-97ac99ab9431',
								gender: gender,
								locale: locale
							},
							password: hashedPassword
						});
						_context.next = 18;
						return userModel.save();

					case 18:
						user = _context.sent;

						// Create and assign a token
						token = _jsonwebtoken2.default.sign({ id: user._id, role: user.info.role }, process.env.TOKEN_SECRET);

						res.header('auth-token', token).json({
							success: true,
							message: 'Hi ' + user.info.nick + '! You are now registered',
							user: user,
							token: token
						});

					case 21:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());
router.post('/login', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
		var _req$body2, nick, password, error, user, validPass, token;

		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						console.log('login');
						_req$body2 = req.body, nick = _req$body2.nick, password = _req$body2.password;
						// Validate

						error = (0, _validation.loginValidation)(req.body).error;

						if (!error) {
							_context2.next = 5;
							break;
						}

						return _context2.abrupt('return', res.status(400).json(error));

					case 5:
						_context2.next = 7;
						return _User2.default.findOne({ 'info.nick': nick });

					case 7:
						user = _context2.sent;

						if (user) {
							_context2.next = 10;
							break;
						}

						return _context2.abrupt('return', res.status(400).json({
							success: false,
							message: 'Nick is not found'
						}));

					case 10:
						_context2.next = 12;
						return _bcryptjs2.default.compare(password, user.password);

					case 12:
						validPass = _context2.sent;

						if (validPass) {
							_context2.next = 15;
							break;
						}

						return _context2.abrupt('return', res.status(400).json({
							success: false,
							message: 'Invalid password'
						}));

					case 15:

						// Create and assign a token
						token = _jsonwebtoken2.default.sign({ id: user._id, role: user.info.role }, process.env.TOKEN_SECRET);

						res.json({
							success: true,
							message: 'Hurry! You logged in :)',
							user: user,
							token: token
						});

					case 17:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}());

exports.default = router;