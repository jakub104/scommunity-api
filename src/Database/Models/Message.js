import mongoose, {Schema} from 'mongoose'

const MessageSchema = new Schema({
	chat: {
		type: Schema.Types.ObjectId,
		ref: 'Chat',
		required: true
	},
	sender: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	readBy: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	reactions: [{
		owner: {
			type: Schema.Types.ObjectId,
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
})

export default mongoose.model('Message', MessageSchema)