import express from 'express'
import verifyUser from '@/Authentication/verifyUser'
import User from '@/Database/Models/User'
import Notification from '@/Database/Models/Notification'

const router = express.Router()

router.post('/', verifyUser, async (req, res) => {
	const {type, receiverId} = req.body

	// Check if notification exist
	const notification = await Notification.findOne({
		sender: req.userId,
		receiver: receiverId,
		type
	})
	if (notification) return res.status(400).json({
		success: false,
		message: 'Notification exist!',
		notification
	})

	// Create notification
	const notificationModel = new Notification({
		sender: req.userId,
		receiver: receiverId,
		type
	})
	await notificationModel.save()
	res.json({
		success: true,
		notification: notificationModel
	})
})
router.patch('/:id/complete', async (req, res) => {
	const {id, key} = req.params
	const {data} = req.body
	const notification = await Notification.findById(id)
	notification.done = true
	await notification.save()
	res.json({
		success: true,
		notification
	})
})
router.delete('/:id', async (req, res) => {
	const {id} = req.params
	const notification = await Notification.findByIdAndDelete(id)
	const receiver = await User.findById(notification.receiver)
	receiver.notifications.pull({_id: notification._id})
	receiver.save()
	res.json(notification)
})

export default router