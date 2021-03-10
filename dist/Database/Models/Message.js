'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageSchema = new _mongoose.Schema({
	chat: {
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'Chat',
		required: true
	},
	sender: {
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	readBy: [{
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	reactions: [{
		owner: {
			type: _mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		icon: {
			type: String
		}
	}],
	content: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
}, {
	collection: 'Messages'
});

exports.default = _mongoose2.default.model('Message', MessageSchema);