import mongoose from 'mongoose'
import 'dotenv/config'

const url = process.env.DB_CONNECT

mongoose.connect(url, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}, (err) => {
	if (err) throw err
	console.log('Connected to DB!')
})