import mongoose, {Schema} from 'mongoose'

export const NotificationSchema = new Schema({
	sender: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	receiver: {
		type: Schema.Types.ObjectId,
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
})

export default mongoose.model('Notification', NotificationSchema)