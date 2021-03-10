'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChatSchema = new _mongoose.Schema({
	owners: [{
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	lastMessage: {
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	},
	type: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
}, {
	collection: 'Chats'
});

exports.default = _mongoose2.default.model('Chat', ChatSchema);