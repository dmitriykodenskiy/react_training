// A module added to use .env file for using environmental variables like MONGODB_URI and PORT
require('dotenv').config()
// Express is a NodeJS library
const express = require('express')
// Morgan is a middleware, which displays response data in console depending on the configuration
const morgan = require('morgan')
const app = express()
// This Middlewere makes possible requests from different origin
const cors = require('cors')
// Import a Person model from database
const Person = require('./models/person')

// This Middlewere makes possible requests from different origin
app.use(cors())
// This Middlewere parses json and puts it to request.body
app.use(express.json())
// With this Middlewere whenever express gets an HTTP GET request it will first check if the build directory contains a file corresponding to the request's address. If a correct file is found, express will return it.
app.use(express.static('build'))
// This Middlewere provides response logging in the console
morgan.token('data', function (req, res) {
    return JSON.stringify(req.body)
})
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.data(req, res)
    ].join(' ')
  }))


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const requestDate = new Date()
    // When call Person.find({}) with empty object as an argument we will get the full list of persons
    Person.find({}).then(persons => {
      const result = `
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${requestDate}</div>
      `
      response.send(result)
    })
})

app.get('/persons/:id', (request, response) => {
  // Find the person with the requested id in database
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => {
    console.log(error);
    response.status(400).send({ error: 'malformatted id' })
  })
})

app.delete('/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/persons/:id', (request, response, next) => {
  const changedPerson = request.body;
  // There is one important detail regarding the use of the findByIdAndUpdate method. By default, the updatedPerson parameter of the event handler receives the original document without the modifications. We added the optional { new: true } parameter, which will cause our event handler to be called with the new modified document instead of the original.
  // {runValidators: true, context: 'query'} parameters allow the Mongoo validators work with PUT request.
  Person.findByIdAndUpdate(request.params.id, changedPerson, {new: true, runValidators: true, context: 'query'})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
    // The error that is passed forwards is given to the next function as a parameter. If next was called without a parameter, then the execution would simply move onto the next route or middleware. If the next function is called with a parameter, then the execution will continue to the error handler middleware.
})

app.post('/persons', (request, response, next) => {
  const newPerson = request.body
  if (!newPerson.name || !newPerson.number) {
      return response.status(400).json({
          error: 'content missing'
      })
  } 

  const person = new Person({
    "name": newPerson.name,
    "number": newPerson.number,
    "toShow": true
  })
  // Save new person to database and return it in the response
  person.save()
  .then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.get('/persons', (request, response) => {
  // When call Person.find({}) with empty object as an argument we will get the full list of persons
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// This middleware must be executed after all routes. If none of the above routes is processed, this middleware is called. It means that the unknown endpoint was requested. After this middleware only the error hadling middlewares must be executed.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  // The error handler checks if the error is a CastError exception, in which case we know that the error was caused by an invalid object id for Mongo. In this situation, the error handler will send a response to the browser with the response object passed as a parameter. In all other error situations, the middleware passes the error forward to the default Express error handler.
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
// this has to be the last loaded middleware.
app.use(errorHandler)

// watch the changes in the PORT
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
