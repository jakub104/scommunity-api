import express from 'express'
import User from '@/Database/Models/User'
import Message from '@/Database/Models/Message'

const router = express.Router()

router.get('/me', async (req, res) => {
	const user = await User.findById(req.userId).populate({
		path: 'chats',
		populate: {
			path: 'owners'
		}
	}).populate({
		path: 'chats',
		populate: {
			path: 'lastMessage'
		}
	})
	res.json({
		success: true,
		user
	})
})
router.get('/:id', async (req, res) => {
	const {id} = req.params
	const user = await User.findById(id)
	res.json({
		user
	})
})
router.get('/profile/:nick', async (req, res) => {
	const {nick} = req.params
	let user
	if (req.userId) {
		user = await User.findOne({'info.nick': nick}).populate({
			path: 'friends',
			populate: {
				path: 'chats'
			}
		}).populate('chats').populate('invitedBy').populate({
			path: 'notifications',
			populate: {
				path: 'sender'
			}
		})
	}
	else {
		user = await User.findOne({'info.nick': nick}).populate('friends')
	}
	res.json({
		success: true,
		user
	})
})
router.patch('/:id/:key/add', async (req, res) => {
	const {id, key} = req.params
	const {dataId} = req.body
	const user = await User.findById(id)
	if (user[key].includes(dataId)) return res.status(400).json({
		success: false,
		message: 'Data already exist!'
	})
	user[key].push(dataId)
	await user.save()
	res.json({
		success: true,
		user
	})
})
router.patch('/:id/:key/remove', async (req, res) => {
	const {id, key} = req.params
	const {dataId} = req.body
	const user = await User.findById(id)
	if (!user[key].includes(dataId)) return res.status(400).json({
		success: false,
		message: 'Data doesn\'t exist!'
	})
	user[key].pull({_id: dataId})
	await user.save()
	res.json({
		success: true,
		[key]: user[key]
	})
})

export default router