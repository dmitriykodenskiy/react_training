
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

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

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

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

app.get('/api/persons/:id', (request, response) => {
    const result = persons.find(person => person.id === Number(request.params.id))
    if (result) {
        response.send(result)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(person => person.id !== Number(request.params.id))
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const generateRandomId = (max) => {
        const random = Math.floor(Math.random() * max) + 1
        const duplicatedId = persons.find(person => person.id === random)
        if (duplicatedId) {
            generateRandomId(100)
        } else {
            const newPerson = request.body
            if (!newPerson.name || !newPerson.number) {
                return response.status(400).json({
                    error: 'content missing'
                })
            } else if(persons.find(person => person.name === newPerson.name)) {
                return response.status(400).json({
                    error: 'name must be unique'
                })
            } else {
                newPerson.id = random
                persons = [...persons, newPerson]
                response.json(persons)
            }
        }
    }
    generateRandomId(100)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
