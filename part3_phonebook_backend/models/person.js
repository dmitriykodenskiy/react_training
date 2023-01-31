// mongoose is a library for MongoDB
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

// Connect to database
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// The schema tells Mongoose how the person objects are to be stored in the database. 
// Document databases like Mongo are schemaless, meaning that the database itself does not care about the structure of the data that is stored in the database. It is possible to store documents with completely different fields in the same collection.
// The idea behind Mongoose is that the data stored in the database is given a schema at the level of the application that defines the shape of the documents stored in any given collection.
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  toShow: Boolean
})

// Transform person's id to the convinient format
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Export the model. In the model definition, the first "Person" parameter is the singular name of the model. The name of the collection will be the lowercase plural "people", because the Mongoose convention is to automatically name collections as the plural (e.g. people) when the schema refers to them in the singular (e.g. "Person")
module.exports = mongoose.model('Person', personSchema)