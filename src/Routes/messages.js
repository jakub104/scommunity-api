import express from 'express'
import Message from '@/Database/Models/Message'

const router = express.Router()

router.post('/', async (req, res) => {
	const {chatId, senderId, receiverId, content} = req.body
	const messageModel = new Message({
		chatId,
		senderId,
		receiverId,
		content
	})
	const message = await messageModel.save()
	res.json({
		message
	})
})

router.get('/:chatId/last', async (req, res) => {
	const {chatId} = req.body
	const message = await Message.findOne({chat: chatId}).sort({createdAt: -1})
	res.json({
		success: true,
		message
	})
})

export default router