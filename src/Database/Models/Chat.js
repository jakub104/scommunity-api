import mongoose, {Schema} from 'mongoose'

const ChatSchema = new Schema({
	owners: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	lastMessage: {
		type: Schema.Types.ObjectId,
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
})

export default mongoose.model('Chat', ChatSchema)