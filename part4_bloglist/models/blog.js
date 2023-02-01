const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)
        .then(result => {
        console.log('connected to MongoDB')
        })
        .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
        })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// Transform person's id to the convinient format
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
