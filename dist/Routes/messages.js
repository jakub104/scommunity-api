'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Message = require('../Database/Models/Message');

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.post('/', function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
		var _req$body, chatId, senderId, receiverId, content, messageModel, message;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_req$body = req.body, chatId = _req$body.chatId, senderId = _req$body.senderId, receiverId = _req$body.receiverId, content = _req$body.content;
						messageModel = new _Message2.default({
							chatId: chatId,
							senderId: senderId,
							receiverId: receiverId,
							content: content
						});
						_context.next = 4;
						return messageModel.save();

					case 4:
						message = _context.sent;

						res.json({
							message: message
						});

					case 6:
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

router.get('/:chatId/last', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
		var chatId, message;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						chatId = req.body.chatId;
						_context2.next = 3;
						return _Message2.default.findOne({ chat: chatId }).sort({ createdAt: -1 });

					case 3:
						message = _context2.sent;

						res.json({
							success: true,
							message: message
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

exports.default = router;