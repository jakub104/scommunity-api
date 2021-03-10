'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UserSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Notification = require('./Notification');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = exports.UserSchema = new _mongoose.Schema({
	info: {
		nick: {
			type: String,
			required: true,
			min: 3,
			max: 255
		},
		biogram: {
			type: String,
			max: 512,
			default: "Cześć!\nJestem nowym użytkownikiem Scommunity 😀"
		},
		avatar: {
			type: String
		},
		gender: {
			type: String,
			required: true
		},
		locale: {
			type: String,
			required: true
		},
		role: {
			type: String,
			default: 'user'
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		interests: [{
			type: String
		}]
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024
	},
	friends: [{
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	invitedBy: [{
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	chats: [{
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'Chat'
	}],
	notifications: [{
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'Notification'
	}]
}, {
	collection: 'Users'
});

exports.default = _mongoose2.default.model('User', UserSchema);