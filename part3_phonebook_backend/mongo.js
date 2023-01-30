const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]
const name = process.argv[3]
const phoneNumber = process.argv[4]

const url =
  `mongodb+srv://asmund_olafsen:${password}@cluster0.e5hd8tb.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
  toShow: Boolean
})

// Transform person's id
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    console.log(returnedObject);
  }
})

const Person = mongoose.model('Person', personSchema)

if (name && phoneNumber) {
  console.log('add person');
  const person = new Person({
    "id": Math.floor(Math.random() * 100),
    "name": name, 
    "number": phoneNumber,
    "toShow": true
  })
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
} else if(name && !phoneNumber) {
  Person.find({"name": name}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if(!name && !phoneNumber) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name}: ${person.number}`)
    })
    mongoose.connection.close()
  })
}



