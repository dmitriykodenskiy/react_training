const blogsRouter = require('express').Router()
const logger = require('../utils/logger')

// Import a Blog model from database
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
blogsRouter.get('/:id', (request, response) => {
    // Find the blog with the requested id in database
    Blog.findById(request.params.id)
    .then(blog => {
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
    })
    .catch(error => {
    logger.error(error);
    response.status(400).send({ error: 'malformatted id' })
    })
})
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter