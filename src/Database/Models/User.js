import mongoose, {Schema} from 'mongoose'
import {NotificationSchema} from '@/Database/Models/Notification'

export const UserSchema = new Schema({
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
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	invitedBy: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	chats: [{
		type: Schema.Types.ObjectId,
		ref: 'Chat'
	}],
	notifications: [{
		type: Schema.Types.ObjectId,
		ref: 'Notification'
	}],
}, {
	collection: 'Users'
})

export default mongoose.model('User', UserSchema)