import mongoose, {Schema} from 'mongoose'

const PostSchema = Schema({
	title: {
		type: String,
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
})

export default mongoose.model('Post', PostSchema)