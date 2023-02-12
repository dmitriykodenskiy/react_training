import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogsSection from './components/BlogsSection'
import Togglable from './components/Togglable'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const blogFormRef = useRef()

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

  const addBlog = (blogObject) => {
    const duplicated = blogs.find(item => item.title === blogObject.title)

    // Validation checks
    if (!blogObject.title) {
      alert(`Please enter a title`)
    }
    if (!blogObject.author) {
      alert(`Please enter an Author name`)
    }
    if (!blogObject.url) {
      alert(`Please enter URL`)
    }

    // Update blogs
    if (blogObject.title && blogObject.author && blogObject.url) {
      if (duplicated) {
        if(window.confirm(`${blogObject.title} is already added to phonebook, replace the old number with the new one?`)){
          blogService
          .update(duplicated.id, blogObject)
          .then(response => {
            setNotification({
              text: `Changed ${blogObject.title}`,
              type: 'notification'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000);
            setBlogs(blogs.map(item => item.id === duplicated.id ? response : item))
            blogFormRef.current.toggleVisibility()
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
            .create(blogObject)
            .then(response => {
              setNotification({
                text: `A new ${blogObject.title} blog of ${blogObject.author} has been added`,
                type: 'notification'
              })
              setTimeout(() => {
                setNotification(null)
              }, 5000);
              setBlogs([...blogs, response])
              blogFormRef.current.toggleVisibility()
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
  
  const removeBlog = (event, blogItem) => {
    event.preventDefault()
    if(window.confirm(`${blogItem.title} is already added to phonebook, replace the old number with the new one?`) && blogItem.user && blogItem.user.username === user.username){
      blogService.remove(blogItem.id)
      .then(blog => {
        const updatedBlogs = blogs.filter(blog => blogItem.id !== blog.id)
        setBlogs(updatedBlogs)
      })
    }
    
  }

  const addLike = (event, blogItem) => {
    event.preventDefault()
    const newLikesValue = blogItem.likes + 1
    const updatedBlog = {...blogItem, likes: newLikesValue}
    const blogToPut = {...updatedBlog, user: blogItem.user?.id}
    blogService.update(blogItem.id, blogToPut)
      .then(blog => {
        const updatedBlogs = blogs.map(blogItem => blogItem.id === updatedBlog.id ? updatedBlog : blogItem)
        setBlogs(updatedBlogs)
      })
      
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
        <section>
          <Notification message={notification} />
          <Togglable buttonLabel='New Blog' user={user} logout={logout} notification={notification} ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable> 
          <BlogsSection blogs={blogs} notification={notification} addLike={addLike} removeBlog={removeBlog}/>
        </section> :
        <LoginForm notification={notification} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      }
    </div>
  )
}

export default App