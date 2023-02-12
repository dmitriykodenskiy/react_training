import { useState } from 'react'

const Blog = ({blog, addLike, removeBlog, user}) => {
  const [visible, setVisible] = useState(false)

  const visiblityClass = visible ? 'expanded' : 'collapsed'
  const buttonText = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  

  return(
    <div className={`${visiblityClass} blog_single`}>
      <div className='blog_title_wrapper'>
        <span className='blog_title'>{blog.title}</span>
        <button className="toggle_btn" onClick={toggleVisibility}>{buttonText}</button>
      </div>
      <div className='blog_info'>
        <div className='blog_author'>
          <span className='blog_author_label'>Author:</span>
          <span>{blog.author}</span>
        </div>
        <div className='blog_url'>
          <span className='blog_url_label'>URL:</span>
          <span>{blog.url}</span>
        </div>
        <div className='blog_likes'>
          <span className='blog_likes_label'>Likes:</span>
          <span>{blog.likes}</span>
          <button className='like_btn' onClick={event => addLike(event, blog)}>Like</button>
        </div>
        {blog.user?.name ? 
          <div className='blog_user'>
            <span className='blog_user_label'>User posted:</span>
            <span>{blog.user.name}</span>
          </div> :
          ''
        }
        {blog.user && blog.user.username === user.username &&
          <button className="remove_btn" onClick={(event) => removeBlog(event, blog)}>Remove</button>
        }
        
      </div>
    </div> 
  )
}
  
   

export default Blog