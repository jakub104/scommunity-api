'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _verifyUser = require('../Authentication/verifyUser');

var _verifyUser2 = _interopRequireDefault(_verifyUser);

var _User = require('../Database/Models/User');

var _User2 = _interopRequireDefault(_User);

var _Notification = require('../Database/Models/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.post('/', _verifyUser2.default, function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
		var _req$body, type, receiverId, notification, notificationModel;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_req$body = req.body, type = _req$body.type, receiverId = _req$body.receiverId;

						// Check if notification exist

						_context.next = 3;
						return _Notification2.default.findOne({
							sender: req.userId,
							receiver: receiverId,
							type: type
						});

					case 3:
						notification = _context.sent;

						if (!notification) {
							_context.next = 6;
							break;
						}

						return _context.abrupt('return', res.status(400).json({
							success: false,
							message: 'Notification exist!',
							notification: notification
						}));

					case 6:

						// Create notification
						notificationModel = new _Notification2.default({
							sender: req.userId,
							receiver: receiverId,
							type: type
						});
						_context.next = 9;
						return notificationModel.save();

					case 9:
						res.json({
							success: true,
							notification: notificationModel
						});

					case 10:
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
router.patch('/:id/complete', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
		var _req$params, id, key, data, notification;

		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_req$params = req.params, id = _req$params.id, key = _req$params.key;
						data = req.body.data;
						_context2.next = 4;
						return _Notification2.default.findById(id);

					case 4:
						notification = _context2.sent;

						notification.done = true;
						_context2.next = 8;
						return notification.save();

					case 8:
						res.json({
							success: true,
							notification: notification
						});

					case 9:
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
router.delete('/:id', function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
		var id, notification, receiver;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						id = req.params.id;
						_context3.next = 3;
						return _Notification2.default.findByIdAndDelete(id);

					case 3:
						notification = _context3.sent;
						_context3.next = 6;
						return _User2.default.findById(notification.receiver);

					case 6:
						receiver = _context3.sent;

						receiver.notifications.pull({ _id: notification._id });
						receiver.save();
						res.json(notification);

					case 10:
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

exports.default = router;