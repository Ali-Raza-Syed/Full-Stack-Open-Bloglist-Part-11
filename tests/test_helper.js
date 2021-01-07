const Blog = require('../models/Blog')
const User = require('../models/user')

const initialBlogs = [
    {
        'title':'React patterns',
        'author':'Michael Chan',
        'url':'https://reactpatterns.com/',
        'likes':7
    },
    {
        'title':'Go To Statement Considered Harmful',
        'author':'Edsger W. Dijkstra',
        'url':'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        'likes':5
    }
]

const initialUsers = [
    {
        'username': 'username1',
        'name': 'user1',
        'password': 'password1'
    },
    {
        'username': 'username2',
        'name': 'user2',
        'password': 'password2'
    }
]

const saltRounds = 10

const nonExistingId = async () => {
    const blog = new Blog({ title: 'title', author: 'author', url: 'url', likes: 0 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb, initialUsers, saltRounds
}