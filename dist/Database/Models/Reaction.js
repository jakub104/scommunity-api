'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactionSchema = new _mongoose.Schema({
	owner: {
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	type: {
		type: String,
		required: true
	}
}, {
	collection: 'Reactions'
});

exports.default = _mongoose2.default.model('Reaction', ReactionSchema);