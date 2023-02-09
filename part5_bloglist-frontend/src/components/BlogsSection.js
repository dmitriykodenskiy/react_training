import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Notification from '../components/Notification'

const BlogsSection = ({ 
    user, 
    blogs,
    notification,
    addBlog, 
    newBlogTitle, 
    handleBlogTitleChange,
    newBlogAuthor,
    handleBlogAuthorChange,
    newBlogUrl,
    handleBlogUrlChange,
    newBlogLikes,
    handleBlogLikesChange,
    logout
    }) => {
    return(
        <section>
            <div><span>{user.name} logged in</span> <button onClick={logout}>Log out</button></div>
            <Notification message={notification} />
            <BlogForm addBlog={addBlog} newBlogTitle={newBlogTitle}  handleBlogTitleChange={handleBlogTitleChange} newBlogAuthor={newBlogAuthor} handleBlogAuthorChange={handleBlogAuthorChange} newBlogUrl={newBlogUrl} handleBlogUrlChange={handleBlogUrlChange} newBlogLikes={newBlogLikes} handleBlogLikesChange={handleBlogLikesChange} />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </section>
    )
}

export default BlogsSection