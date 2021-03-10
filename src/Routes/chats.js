import Chat from '@/Database/Models/Chat'
import Message from '@/Database/Models/Message'
import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
	const {owners, name, type} = req.body
	const chatModel = new Chat({
		owners,
		name,
		type
	})
	const chat = await chatModel.save()
	res.json({
		success: true,
		chat
	})
})
router.get('/:chatId', async (req, res) => {
	const {chatId} = req.params
	const {skip} = req.query
	// console.log(friendId)
	const chat = await Chat.findById(chatId).populate('owners').populate({
		path: 'messages',
		options: {
			limit: 50,
			skip: Number(skip)
		}
	})
	const messages = await Message.find({chat: chatId}).sort({'createdAt': -1}).limit(50)
	res.json({
		success: true,
		chat,
		messages
	})
})
router.patch('/:chatId/message/add', async (req, res) => {
	const {chatId} = req.params
	const {content, sender} = req.body
	const messageModel = new Message({
		chat: chatId,
		sender,
		content
	})
	const message = await messageModel.save()
	const chat = await Chat.findById(chatId)
	chat.lastMessage = message
	await chat.save()
	res.json({
		success: true,
		message: messageModel
	})
})

export default router