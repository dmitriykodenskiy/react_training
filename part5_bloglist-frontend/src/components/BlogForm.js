import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
        
    const [newBlogTitle, setBlogTitle] = useState('')
    const [newBlogAuthor, setBlogAuthor] = useState('') 
    const [newBlogUrl, setBlogUrl] = useState('') 
    const [newBlogLikes, setBlogLikes] = useState('') 

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlogTitle, 
            author: newBlogAuthor, 
            url: newBlogUrl,
            likes: newBlogLikes
        })
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        setBlogLikes('')
    }

    return(
        <form onSubmit={addBlog}>
            <div>
                <label htmlFor='blogTitle'>Title: </label>
                <input id='blogTitle' value={newBlogTitle} onChange={({target}) => setBlogTitle(target.value)}/>
            </div>
            <div>
                <label htmlFor='blogAuthor'>Author: </label>
                <input id='blogAuthor' value={newBlogAuthor} onChange={({target}) => setBlogAuthor(target.value)}/>
            </div>
            <div>
                <label htmlFor='blogUrl'>URL: </label>
                <input id='blogUrl' value={newBlogUrl} onChange={({target}) => setBlogUrl(target.value)}/>
            </div>
            <div>
                <label htmlFor='blogLikes'>Likes: </label>
                <input id='blogLikes' value={newBlogLikes} onChange={({target}) => setBlogLikes(target.value)}/>
            </div>
            <button type="submit">save</button>
        </form> 
    ) 
}

export default BlogForm