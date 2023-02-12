import Blog from '../components/Blog'

const BlogsSection = ({ blogs, addLike, removeBlog, user }) => {
    const sortedBlogs = blogs.sort((a, b) =>  a.likes === b.likes ? 0 : a.likes < b.likes ? 1 : -1)
    return(
        <div className='blogs_list'>
            {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user}/>
            )}
        </div>
    )
}

export default BlogsSection