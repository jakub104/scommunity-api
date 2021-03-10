import mongoose, {Schema} from 'mongoose'

const ReactionSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	type: {
		type: String,
		required: true
	}
}, {
	collection: 'Reactions'
})

export default mongoose.model('Reaction', ReactionSchema)