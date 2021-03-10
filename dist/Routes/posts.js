'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Post = require('../Database/Models/Post');

var _Post2 = _interopRequireDefault(_Post);

var _verifyUser = require('../Authentication/verifyUser');

var _verifyUser2 = _interopRequireDefault(_verifyUser);

var _verifyRole = require('../Authentication/verifyRole');

var _verifyRole2 = _interopRequireDefault(_verifyRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import userRole from '@/Authentication/userRole'


var router = _express2.default.Router();
// SUBMIT A POST
router.get('/', _verifyUser2.default, (0, _verifyRole2.default)('admin'), function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
		var posts;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _Post2.default.find();

					case 3:
						posts = _context.sent;
						//.limit()
						res.json(posts);
						_context.next = 10;
						break;

					case 7:
						_context.prev = 7;
						_context.t0 = _context['catch'](0);

						res.status(400).json(_context.t0);

					case 10:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 7]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());
router.post('/', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
		var post, data;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						post = new _Post2.default({
							title: req.body.title,
							description: req.body.description
						});
						_context2.prev = 1;
						_context2.next = 4;
						return post.save();

					case 4:
						data = _context2.sent;

						res.json(data);
						_context2.next = 11;
						break;

					case 8:
						_context2.prev = 8;
						_context2.t0 = _context2['catch'](1);

						res.json(_context2.t0);

					case 11:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[1, 8]]);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}());

// GET A SPECIFIC POST
router.get('/:postId', function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
		var id, post;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						id = req.params.postId;
						_context3.next = 4;
						return _Post2.default.findById(id);

					case 4:
						post = _context3.sent;

						res.json(post);
						_context3.next = 11;
						break;

					case 8:
						_context3.prev = 8;
						_context3.t0 = _context3['catch'](0);

						res.status(404).json(_context3.t0);

					case 11:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 8]]);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}());
// DELETE POST
router.delete('/:postId', function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
		var id, post;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.prev = 0;
						id = req.params.postId;
						_context4.next = 4;
						return _Post2.default.findByIdAndDelete(id);

					case 4:
						post = _context4.sent;

						res.json(post);
						_context4.next = 11;
						break;

					case 8:
						_context4.prev = 8;
						_context4.t0 = _context4['catch'](0);

						res.status(404).json(_context4.t0);

					case 11:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[0, 8]]);
	}));

	return function (_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}());

// UPDATE POST
router.patch('/:postId', function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
		var id, post;
		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.prev = 0;
						id = req.params.postId;
						_context5.next = 4;
						return _Post2.default.findOneAndUpdate(id, {
							title: req.body.title,
							description: req.body.description
						});

					case 4:
						post = _context5.sent;

						res.json(post);
						_context5.next = 11;
						break;

					case 8:
						_context5.prev = 8;
						_context5.t0 = _context5['catch'](0);

						res.status(404).json(_context5.t0);

					case 11:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[0, 8]]);
	}));

	return function (_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
}());

module.exports = router;