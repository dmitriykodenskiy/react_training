const express = require('express')
const app = express()
const cors = require('cors')
// Routes
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
// Error handlers
const { unknownEndpoint, errorHandler } = require('./utils/errorHandlers')

app.use(cors())

// This Middlewere parses json and puts it to request.body
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// This has to be called after all routes
app.use(unknownEndpoint)

// this has to be the last loaded middleware.
app.use(errorHandler)

module.exports = app