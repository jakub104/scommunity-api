'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _User = require('../Database/Models/User');

var _User2 = _interopRequireDefault(_User);

var _Message = require('../Database/Models/Message');

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.get('/me', function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
		var user;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return _User2.default.findById(req.userId).populate({
							path: 'chats',
							populate: {
								path: 'owners'
							}
						}).populate({
							path: 'chats',
							populate: {
								path: 'lastMessage'
							}
						});

					case 2:
						user = _context.sent;

						res.json({
							success: true,
							user: user
						});

					case 4:
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
router.get('/:id', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
		var id, user;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						id = req.params.id;
						_context2.next = 3;
						return _User2.default.findById(id);

					case 3:
						user = _context2.sent;

						res.json({
							user: user
						});

					case 5:
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
router.get('/profile/:nick', function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
		var nick, user;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						nick = req.params.nick;
						user = void 0;

						if (!req.userId) {
							_context3.next = 8;
							break;
						}

						_context3.next = 5;
						return _User2.default.findOne({ 'info.nick': nick }).populate({
							path: 'friends',
							populate: {
								path: 'chats'
							}
						}).populate('chats').populate('invitedBy').populate({
							path: 'notifications',
							populate: {
								path: 'sender'
							}
						});

					case 5:
						user = _context3.sent;
						_context3.next = 11;
						break;

					case 8:
						_context3.next = 10;
						return _User2.default.findOne({ 'info.nick': nick }).populate('friends');

					case 10:
						user = _context3.sent;

					case 11:
						res.json({
							success: true,
							user: user
						});

					case 12:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}());
router.patch('/:id/:key/add', function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
		var _req$params, id, key, dataId, user;

		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_req$params = req.params, id = _req$params.id, key = _req$params.key;
						dataId = req.body.dataId;
						_context4.next = 4;
						return _User2.default.findById(id);

					case 4:
						user = _context4.sent;

						if (!user[key].includes(dataId)) {
							_context4.next = 7;
							break;
						}

						return _context4.abrupt('return', res.status(400).json({
							success: false,
							message: 'Data already exist!'
						}));

					case 7:
						user[key].push(dataId);
						_context4.next = 10;
						return user.save();

					case 10:
						res.json({
							success: true,
							user: user
						});

					case 11:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined);
	}));

	return function (_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}());
router.patch('/:id/:key/remove', function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
		var _req$params2, id, key, dataId, user;

		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_req$params2 = req.params, id = _req$params2.id, key = _req$params2.key;
						dataId = req.body.dataId;
						_context5.next = 4;
						return _User2.default.findById(id);

					case 4:
						user = _context5.sent;

						if (user[key].includes(dataId)) {
							_context5.next = 7;
							break;
						}

						return _context5.abrupt('return', res.status(400).json({
							success: false,
							message: 'Data doesn\'t exist!'
						}));

					case 7:
						user[key].pull({ _id: dataId });
						_context5.next = 10;
						return user.save();

					case 10:
						res.json(_defineProperty({
							success: true
						}, key, user[key]));

					case 11:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined);
	}));

	return function (_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
}());

exports.default = router;