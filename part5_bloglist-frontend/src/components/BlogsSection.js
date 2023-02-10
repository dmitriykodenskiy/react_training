import Blog from '../components/Blog'
import Notification from '../components/Notification'

const BlogsSection = ({ 
    user, 
    blogs,
    notification,
    logout,
    children
    }) => {
    return(
        <section>
            <div><span>{user.name} logged in</span> <button onClick={logout}>Log out</button></div>
            <Notification message={notification} />
            {children}
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </section>
    )
}

export default BlogsSection