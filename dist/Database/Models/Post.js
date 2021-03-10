'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostSchema = (0, _mongoose.Schema)({
	title: {
		type: String
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
}, {
	collection: 'Posts'
});

exports.default = _mongoose2.default.model('Post', PostSchema);