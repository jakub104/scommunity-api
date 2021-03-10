import 'babel-polyfill'
import '@/Database/mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import http from 'http'
import socket from 'socket.io'
// import fileUpload from 'express-fileupload'
// import fs from 'fs'
// ROUTES
import postsRoute from '@/Routes/posts'
import authRoute from '@/Routes/auth'
import usersRoute from '@/Routes/users'
import messagesRoute from '@/Routes/messages'
import notificationsRoute from '@/Routes/notifications'
import chatsRoute from '@/Routes/chats'
// MIDDLEWARES
import setUser from '@/Middlewares/setUser'

const app = express()
app.use(cors())
app.use(express.json())
app.use(setUser)
app.use('/api/posts', postsRoute)
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/messages', messagesRoute)
app.use('/api/notifications', notificationsRoute)
app.use('/api/chats', chatsRoute)
app.get('/', (req, res) => {
	res.send('About page')
})

const server = http.createServer(app)
const io = socket(server, {
	cors: {origin: "*"}
})

io.on('connection', socket => {
	console.log(`|${socket.id}| connected`);
	socket.on('disconnect', () => {
		console.log(`|${socket.id}| disconnected`);
		socket.removeAllListeners();
	})
	socket.on('message', (message, chatId) => {
		io.sockets.emit('message', message, chatId)
	})
	socket.on('writing', (user) => {
		socket.broadcast.emit('writing', user)
	})
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}...`))
