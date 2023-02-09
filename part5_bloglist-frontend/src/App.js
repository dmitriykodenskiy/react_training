import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogsSection from './components/BlogsSection'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setBlogTitle] = useState('')
  const [newBlogAuthor, setBlogAuthor] = useState('') 
  const [newBlogUrl, setBlogUrl] = useState('') 
  const [newBlogLikes, setBlogLikes] = useState('') 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        type: 'error',
        text: 'Wrong credentials'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const duplicated = blogs.find(item => item.title === newBlogTitle)

    // Validation checks
    if (!newBlogTitle) {
      alert(`Please enter a title`)
    }
    if (!newBlogAuthor) {
      alert(`Please enter an Author name`)
    }
    if (!newBlogUrl) {
      alert(`Please enter URL`)
    }

    // Update blogs
    if (newBlogTitle && newBlogAuthor && newBlogUrl) {
      const newItem = {
        title: newBlogTitle, 
        author: newBlogAuthor, 
        url: newBlogUrl,
        likes: newBlogLikes
      }
      if (duplicated) {
        if(window.confirm(`${newBlogTitle} is already added to phonebook, replace the old number with the new one?`)){
          blogService
          .update(duplicated.id, newItem)
          .then(response => {
            setNotification({
              text: `Changed ${newBlogTitle}`,
              type: 'notification'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000);
            setBlogs(blogs.map(item => item.id === duplicated.id ? response : item))
          }).catch(error => {
            console.error(error.response.data.error);
            setNotification({
              text: `${error.response.data.error}`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 10000);
          })
        }
      } else {
        blogService
            .create(newItem)
            .then(response => {
              setNotification({
                text: `A new ${newBlogTitle} blog of ${newBlogAuthor} has been added`,
                type: 'notification'
              })
              setTimeout(() => {
                setNotification(null)
              }, 5000);
              setBlogs([...blogs, response])
              setBlogTitle('')
              setBlogAuthor('')
              setBlogUrl('')
              setBlogLikes('')
            }).catch(error => {
              console.error(error.response.data.error);
              setNotification({
                text: `${error.response.data.error}`,
                type: 'error'
              })
              setTimeout(() => {
                setNotification(null)
              }, 10000);
            })
      }
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogAppUser')
    window.location.reload()
  }

  return (
    <div>
      <h2>blogs</h2>
      {user ?
        <BlogsSection blogs={blogs} user={user} notification={notification} addBlog={addBlog} newBlogTitle={newBlogTitle}  handleBlogTitleChange={setBlogTitle} newBlogAuthor={newBlogAuthor} handleBlogAuthorChange={setBlogAuthor} newBlogUrl={newBlogUrl} handleBlogUrlChange={setBlogUrl} newBlogLikes={newBlogLikes} handleBlogLikesChange={setBlogLikes} logout={logout} /> :
        <LoginForm notification={notification} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      }
    </div>
  )
}

export default App