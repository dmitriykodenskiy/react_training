import Blog from '../components/Blog'

const BlogsSection = ({ blogs, addLike }) => {
    return(
        <div className='blogs_list'>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} addLike={addLike}/>
            )}
        </div>
    )
}

export default BlogsSection