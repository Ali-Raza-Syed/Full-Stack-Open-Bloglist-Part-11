const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/Blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
require('express-async-errors')
const jwt = require('jsonwebtoken')

const api = supertest(app)

describe('For blogs creation', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    let userArray = []
    for(let user of helper.initialUsers){
      const passwordHash = await bcrypt.hash(user.password, helper.saltRounds)
      const userObject = new User({...user, passwordHash})
      const savedUserObject = await userObject.save()
      userArray = userArray.concat(savedUserObject)
    }
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog({...blog, user: userArray[0]._id}))
    const promiseArrayBlogs = blogObjects.map(blog => blog.save())
    const blogsInDBArray = await Promise.all(promiseArrayBlogs)
    const blogsInDBIDs = blogsInDBArray.map(blog => blog._id)
    userArray[0].blogs = blogsInDBIDs
    await userArray[0].save()
  })
  
  test('blogs are returned as json with correct number', async () => {
    const resp = await api
                        .get('/api/blogs')
                        .expect(200)
                        .expect('Content-Type', /application\/json/)
  
    expect(resp.body).toHaveLength(2) 
  })
  
  test('blogs have id property', async () => {
    const allBlogs = await helper.blogsInDb()
    expect(allBlogs[0].id).toBeDefined()
  })
  
  test('blog is saved successfully', async () => {
    const usersInDB = await helper.usersInDb()
    const userID = usersInDB.find(user => user.username === helper.initialUsers[0].username).id
    const userForToken = {
      username: helper.initialUsers[0].username,
      id: userID,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    const newBlog = {
      "title":"check title",
      "author":"check author",
      "url":"check url",
      "likes":10
    }
    await api.post('/api/blogs').send(newBlog).set({Authorization: 'Bearer ' + token}).expect(201)
  
    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
    const allAuthors = allBlogs.map(blog => blog.author)
    expect(allAuthors).toContainEqual('check author')
  })
  
  test('blog with missing likes defaults to 0 likes', async () => {
    const usersInDB = await helper.usersInDb()
    const userID = usersInDB.find(user => user.username === helper.initialUsers[0].username).id
    const userForToken = {
      username: helper.initialUsers[0].username,
      id: userID,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      "title":"check title",
      "author":"check author",
      "url":"check url"
    }
    await api.post('/api/blogs').set({Authorization: 'Bearer ' + token}).send(newBlog)
    const allBlogs = await helper.blogsInDb()
    const newBlogInDB = allBlogs.find(blog => blog.title === 'check title')
    expect(newBlogInDB.likes).toBeDefined()
    expect(newBlogInDB.likes).toEqual(0)
  })
  
  test('blog with missing title throws 400 bad request error with appropriate error message', async () => {
    const usersInDB = await helper.usersInDb()
    const userID = usersInDB.find(user => user.username === helper.initialUsers[0].username).id
    const userForToken = {
      username: helper.initialUsers[0].username,
      id: userID,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      "author":"check author",
      "url":"check url",
      "likes":10
    }
    const resp = await api.post('/api/blogs').set({Authorization: 'Bearer ' + token}).send(newBlog).expect(400)
    expect(resp.body.error).toBeDefined()
    expect(resp.body.error).toEqual('title missing')
  })
  
  test('blog with missing url throws 400 bad request error with appropriate error message', async () => {
    const usersInDB = await helper.usersInDb()
    const userID = usersInDB.find(user => user.username === helper.initialUsers[0].username).id
    const userForToken = {
      username: helper.initialUsers[0].username,
      id: userID,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      "title":"check title",
      "author":"check author",
      "likes":10
    }
    const resp = await api.post('/api/blogs').set({Authorization: 'Bearer ' + token}).send(newBlog).expect(400)
    expect(resp.body.error).toBeDefined()
    expect(resp.body.error).toEqual('url missing')
  })
  
  test('blog removing fine', async () => {
    const usersInDB = await helper.usersInDb()
    const userID = usersInDB.find(user => user.username === helper.initialUsers[0].username).id
    const userForToken = {
      username: helper.initialUsers[0].username,
      id: userID,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    const allBlogsPrevious = await helper.blogsInDb()
    await api.delete(`/api/blogs/${allBlogsPrevious[0].id}`).set({Authorization: 'Bearer ' + token}).expect(204)
    const allBlogsAfter = await helper.blogsInDb()
    expect(allBlogsAfter).toHaveLength(helper.initialBlogs.length - 1)
  })
  
  test('blog updating fine', async() => {
    const allBlogsPrevious = await helper.blogsInDb()
    let updatedBlog = allBlogsPrevious[0]
    updatedBlog.likes = updatedBlog.likes + 1
    await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog)
    const allBlogsAfter = await helper.blogsInDb()
    const updatedBlogInDB = allBlogsAfter.find(blog => blog.title === updatedBlog.title)
    expect(updatedBlogInDB.likes).toEqual(updatedBlog.likes)
  })

  test('blog gives unauthorized error with 401 status if token is not provided', async () => {
    const newBlog = {
      "title":"check title",
      "author":"check author",
      "url":"check url",
      "likes":10
    }
    const resp = await api.post('/api/blogs').send(newBlog).expect(401)
    expect(resp.body.error).toBeDefined()
    expect(resp.body.error).toEqual('invalid token')
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('username of length less than 4 is not created and returns 400 status code with proper message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mlu',
      name: 'Matti Luu',
      password: 'salainen',
    }

    const resp = await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(resp.body.error).toBeDefined()
    expect(resp.body.error).toEqual('username must atleast be of length 4')

  })

  test('password of length less than 4 is not created and returns 400 status code with proper message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluuuuuuu',
      name: 'Matti Luu',
      password: 'sal',
    }

    const resp = await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(resp.body.error).toBeDefined()
    expect(resp.body.error).toEqual('password must atleast be of length 4')

  })

  test('user with no username is not created and returns 400 status code with proper message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Matti Luu',
      password: 'salainen',
    }

    const resp = await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(resp.body.error).toBeDefined()
    expect(resp.body.error).toEqual('username missing')

  })

  test('user with no password is not created and returns 400 status code with proper message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluuuuuuu',
      name: 'Matti Luu'
    }

    const resp = await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(resp.body.error).toBeDefined()
    expect(resp.body.error).toEqual('password missing')

  })
})

afterAll(() => {
  mongoose.connection.close()
})