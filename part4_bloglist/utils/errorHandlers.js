const logger = require('../utils/logger')

// This middleware must be executed after all routes. If none of the above routes is processed, this middleware is called. It means that the unknown endpoint was requested. After this middleware only the error hadling middlewares must be executed.
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    // The error handler checks if the error is a CastError exception, in which case we know that the error was caused by an invalid object id for Mongo. In this situation, the error handler will send a response to the browser with the response object passed as a parameter. In all other error situations, the middleware passes the error forward to the default Express error handler.
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

module.exports = { unknownEndpoint, errorHandler }