require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
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
    const result = `
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${requestDate}</div>
    `
    response.send(result)
})

app.get('/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
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
  Person.findByIdAndUpdate(request.params.id, changedPerson, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/persons', (request, response) => {
  const newPerson = request.body
  if (!newPerson.name || !newPerson.number) {
      return response.status(400).json({
          error: 'content missing'
      })
  } 
  // else if(persons.find(person => person.name === newPerson.name)) {
  //     return response.status(400).json({
  //         error: 'name must be unique'
  //     })
  // } 

  const person = new Person({
    "name": newPerson.name, 
    "number": newPerson.number,
    "toShow": true
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
