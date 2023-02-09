const BlogForm = ({ 
        addBlog, 
        newBlogTitle, 
        handleBlogTitleChange,
        newBlogAuthor,
        handleBlogAuthorChange,
        newBlogUrl,
        handleBlogUrlChange,
        newBlogLikes,
        handleBlogLikesChange
    }) => {
    return(
        <form onSubmit={addBlog}>
            <div>
                <label htmlFor='blogTitle'>Title: </label>
                <input id='blogTitle' value={newBlogTitle} onChange={({target}) => handleBlogTitleChange(target.value)}/>
            </div>
            <div>
                <label htmlFor='blogAuthor'>Author: </label>
                <input id='blogAuthor' value={newBlogAuthor} onChange={({target}) => handleBlogAuthorChange(target.value)}/>
            </div>
            <div>
                <label htmlFor='blogUrl'>URL: </label>
                <input id='blogUrl' value={newBlogUrl} onChange={({target}) => handleBlogUrlChange(target.value)}/>
            </div>
            <div>
                <label htmlFor='blogLikes'>Likes: </label>
                <input id='blogLikes' value={newBlogLikes} onChange={({target}) => handleBlogLikesChange(target.value)}/>
            </div>
            <button type="submit">save</button>
        </form> 
    ) 
}

export default BlogForm