const dummy = (blogs) => {
    return 1;
}


const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => {
        return item.likes ? item.likes + sum : 0
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((maxLikes, blog) => maxLikes.likes > blog.likes ? maxLikes : blog)
}

const mostBlogs = (blogs) => {
	const authors = blogs
        .map(blog => blog.author)
        .reduce((acc, item) => {
            return {
                ...acc,
                [item]: (acc[item] || 0) + 1
            }
        }, {})
	let most = {
		author: '',
		blogs: 0
	}
	for (let author in authors){
		if(authors[author] > most.blogs){
			most = { author: author, blogs: authors[author] }
		}
	}
	return most
}

const mostLikes = (blogs) => {
	const authors = {}
	blogs.forEach((item) => {
		if(authors.hasOwnProperty(item.author)) {
			authors[item.author] = authors[item.author] + item.likes
		} else {
			authors[item.author] = item.likes
		}
	})
	let most = {
		author: '',
		likes: 0
	}
	for (let author in authors){
		if(authors[author] > most.likes){
			most = {author: author, likes: authors[author]}
		}
	}
	return most
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}