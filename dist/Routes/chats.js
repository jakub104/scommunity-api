'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Chat = require('../Database/Models/Chat');

var _Chat2 = _interopRequireDefault(_Chat);

var _Message = require('../Database/Models/Message');

var _Message2 = _interopRequireDefault(_Message);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.post('/', function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
		var _req$body, owners, name, type, chatModel, chat;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_req$body = req.body, owners = _req$body.owners, name = _req$body.name, type = _req$body.type;
						chatModel = new _Chat2.default({
							owners: owners,
							name: name,
							type: type
						});
						_context.next = 4;
						return chatModel.save();

					case 4:
						chat = _context.sent;

						res.json({
							success: true,
							chat: chat
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
router.get('/:chatId', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
		var chatId, skip, chat, messages;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						chatId = req.params.chatId;
						skip = req.query.skip;
						// console.log(friendId)

						_context2.next = 4;
						return _Chat2.default.findById(chatId).populate('owners').populate({
							path: 'messages',
							options: {
								limit: 50,
								skip: Number(skip)
							}
						});

					case 4:
						chat = _context2.sent;
						_context2.next = 7;
						return _Message2.default.find({ chat: chatId }).sort({ 'createdAt': -1 }).limit(50);

					case 7:
						messages = _context2.sent;

						res.json({
							success: true,
							chat: chat,
							messages: messages
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
router.patch('/:chatId/message/add', function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
		var chatId, _req$body2, content, sender, messageModel, message, chat;

		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						chatId = req.params.chatId;
						_req$body2 = req.body, content = _req$body2.content, sender = _req$body2.sender;
						messageModel = new _Message2.default({
							chat: chatId,
							sender: sender,
							content: content
						});
						_context3.next = 5;
						return messageModel.save();

					case 5:
						message = _context3.sent;
						_context3.next = 8;
						return _Chat2.default.findById(chatId);

					case 8:
						chat = _context3.sent;

						chat.lastMessage = message;
						_context3.next = 12;
						return chat.save();

					case 12:
						res.json({
							success: true,
							message: messageModel
						});

					case 13:
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