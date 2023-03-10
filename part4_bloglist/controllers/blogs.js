const blogsRouter = require('express').Router()
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
require('express-async-errors')

// Import a Blog model from database
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate( 'user', { username: 1, name: 1 })
    response.json(blogs)
})
blogsRouter.get('/:id', async (request, response) => {
    try {
        // Find the blog with the requested id in database
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        logger.error(error);
        response.status(400).send({ error: 'malformatted id' })
    }
})
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    // const user = await User.findById(body.userId)
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    if (!newBlog.title || !newBlog.author) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const savedBlog = await newBlog.save()
    user.blogs = [...user.blogs, savedBlog._id]
    await user.save()
    const returnedBlog = await Blog.find({ "_id": savedBlog._id }).populate( 'user', { username: 1, name: 1 })
    response.status(201).json(returnedBlog[0])
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedOption = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedOption, { new: true, runValidators: true, context: 'query' })
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter