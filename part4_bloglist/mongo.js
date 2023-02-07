// A module added to use .env file for using environmental variables like MONGODB_URI and PORT
require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const title = process.argv[3]
const author = process.argv[4]
const url = process.argv[5]
const likes = process.argv[6]


mongoose.set('strictQuery',false)
mongoose.connect(process.env.TEST_MONGODB_URI)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// Transform blog's id
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    console.log(returnedObject);
  }
})

const Blog = mongoose.model('Blog', blogSchema)

if (title && author && url && likes) {
  const blog = new Blog({
    "title": title, 
    "author": author,
    "url": url,
    "likes": likes
  })
  blog.save().then(result => {
    console.log('blog saved!')
    mongoose.connection.close()
  })
} else if(title && author && !url) {
  Blog.find( { "title": title, "author": author } ).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
} else if(!title && !author) {
  Blog.find({}).then(result => {
    console.log('Blogs:')
    result.forEach(blog => {
      console.log(`${blog.title}: ${blog.author}`)
    })
    mongoose.connection.close()
  })
}



