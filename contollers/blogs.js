const router = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/user')
require('express-async-errors')
const jwt = require('jsonwebtoken')

router.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, _id: 1})
    response.json(blogs)
})

router.post('/', async (request, response) => {
    let body = request.body
    if(body.url === undefined) return response.status(400).json({error: 'url missing'})
    if(body.title === undefined) return response.status(400).json({error: 'title missing'})
    if(body.likes === undefined) body.likes = 0
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    body.user = user._id

    const blog = new Blog(body)
    const resultBlog = await blog.save()

    user.blogs = user.blogs.concat(resultBlog._id)
    await user.save()

    response.status(201).json(resultBlog)
})

router.delete('/:id', async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) return res.status(401).json({ error: 'token missing or invalid' })
  
    const blog = await Blog.findById(req.params.id)
    if(!blog) return res.status(401).json({ error: 'Blog id not found in database' })
    if(blog.user.toString() !== decodedToken.id) return res.status(401).json({ error: 'token does not match with blog creator' })

    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

router.put('/:id', async (req, res) => {
    const body = req.body
    const blog = {
        'title': body.title,
        'author': body.author,
        'url': body.url,
        'likes': body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    if(updatedBlog) return res.json(updatedBlog)
    else res.status(404).end()
})
module.exports = router