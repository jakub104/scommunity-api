import express from 'express'
import Post from '@/Database/Models/Post'
// import userRole from '@/Authentication/userRole'
import verifyUser from '@/Authentication/verifyUser'
import verifyRole from '@/Authentication/verifyRole'

const router = express.Router()
// SUBMIT A POST
router.get('/', verifyUser, verifyRole('admin'), async (req, res) => {
	try {
		const posts = await Post.find() //.limit()
		res.json(posts)
	}
	catch (err) {
		res.status(400).json(err)
	}
})
router.post('/', async (req, res) => {
	const post = new Post({
		title: req.body.title,
		description: req.body.description
	})
	try {
		const data = await post.save()
		res.json(data)
	}
	catch (err) {
		res.json(err)
	}
})

// GET A SPECIFIC POST
router.get('/:postId', async (req, res) => {
	try {
		const id = req.params.postId
		const post = await Post.findById(id)
		res.json(post)
	}
	catch (err) {
		res.status(404).json(err)
	}
})
// DELETE POST
router.delete('/:postId', async (req, res) => {
	try {
		const id = req.params.postId
		const post = await Post.findByIdAndDelete(id)
		res.json(post)
	}
	catch (err) {
		res.status(404).json(err)
	}
})

// UPDATE POST
router.patch('/:postId', async (req, res) => {
	try {
		const id = req.params.postId
		const post = await Post.findOneAndUpdate(id, {
			title: req.body.title,
			description: req.body.description
		})
		res.json(post)
	}
	catch (err) {
		res.status(404).json(err)
	}
})

module.exports = router