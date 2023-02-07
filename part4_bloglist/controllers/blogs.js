const blogsRouter = require('express').Router()
const logger = require('../utils/logger')
require('express-async-errors')

// Import a Blog model from database
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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
    const newBlog = new Blog(request.body)
    if (!newBlog.title || !newBlog.author) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
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