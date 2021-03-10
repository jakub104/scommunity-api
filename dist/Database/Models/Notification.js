'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NotificationSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationSchema = exports.NotificationSchema = new _mongoose.Schema({
	sender: {
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	receiver: {
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	type: {
		type: String,
		required: true
	},
	readed: {
		type: Boolean,
		default: false
	},
	done: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
}, {
	collection: 'Notifications'
});

exports.default = _mongoose2.default.model('Notification', NotificationSchema);