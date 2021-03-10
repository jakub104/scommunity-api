'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Joi = require('@hapi/joi');

// Register Validation
module.exports.registerValidation = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
		var schema;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						schema = Joi.object({
							nick: Joi.string().min(3).required(),
							password: Joi.string().min(6).required(),
							gender: Joi.string().required(),
							biogram: Joi.string()
						});
						// console.log(await schema.validate(data).details);

						return _context.abrupt('return', schema.validate(data));

					case 2:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x) {
		return _ref.apply(this, arguments);
	};
}();

// Login Validation
module.exports.loginValidation = function (data) {
	var schema = Joi.object({
		nick: Joi.string().min(3).required(),
		password: Joi.string().min(6).required()
	});
	return schema.validate(data);
};