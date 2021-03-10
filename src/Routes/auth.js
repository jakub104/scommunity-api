import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '@/Database/Models/User'
import { registerValidation, loginValidation } from '@/validation'

const router = express.Router()

router.post('/register', async (req, res) => {
	const {nick, gender, locale, password} = req.body
	// Validate
	const error = registerValidation(req.body).error
	if (error) return res.status(400).json(error)

	// Check if exist
	const nickExist = await User.findOne({nick})
	if (nickExist) return res.status(400).json({
		success: false,
		message: 'Nick already exists!'
	})

	// Hash password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	// Create User
	const userModel = new User({
		info: {
			nick,
			avatar: gender === 'male' ? 'https://firebasestorage.googleapis.com/v0/b/szulcus-community.appspot.com/o/male.png?alt=media&token=b86299d3-b943-4ca3-8a5d-766cf47a52ae' : 'https://firebasestorage.googleapis.com/v0/b/szulcus-community.appspot.com/o/female.png?alt=media&token=f8d1484a-becf-414b-8b1f-97ac99ab9431',
			gender,
			locale,
		},
		password: hashedPassword,
	})
	const user = await userModel.save()
	// Create and assign a token
	const token = jwt.sign({id: user._id, role: user.info.role}, process.env.TOKEN_SECRET)
	res.header('auth-token', token).json({
		success: true,
		message: `Hi ${user.info.nick}! You are now registered`,
		user,
		token
	})
})
router.post('/login', async (req, res) => {
	console.log('login')
	const {nick, password} = req.body
	// Validate
	const error = loginValidation(req.body).error
	if (error) return res.status(400).json(error)

	// Check if the nick exist
	const user = await User.findOne({'info.nick': nick})
	if (!user) return res.status(400).json({
		success: false,
		message: 'Nick is not found'
	})

	// Password is correct
	const validPass = await bcrypt.compare(password, user.password)
	if (!validPass) return res.status(400).json({
		success: false,
		message: 'Invalid password'
	})

	// Create and assign a token
	const token = jwt.sign({id: user._id, role: user.info.role}, process.env.TOKEN_SECRET)
	res.json({
		success: true,
		message: 'Hurry! You logged in :)',
		user,
		token
	})
})

export default router