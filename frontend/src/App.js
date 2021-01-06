import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Button from './components/Button'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({ 'message': '', 'color': '' })

  const refBlogFormTogglable = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      let blogsList = await blogService.getAll()
      blogsList.sort((a, b) => a.likes > b.likes ? -1 : 1)
      setBlogs( blogsList )
    }
    fetchBlogs()
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showMessage('Wrong Credentials', 'red')
    }
  }

  const loginForm = () =>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id = 'login-button'>login</button>
    </form>

  const onLogOutClick = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async (newBlog) => {
    const blog = await blogService.create(newBlog)
    setBlogs(blogs.concat(blog))
    showMessage('New blog added successfully')
    refBlogFormTogglable.current.toggleVisibility()
  }

  const showMessage = (message, color = 'green', time = 3000) => {
    setNotificationMessage({
      'message': message,
      'color': color
    })
    setTimeout(() => setNotificationMessage({ 'message': '', 'color': '' }), time)
  }

  const onClickLike = async (blog) => {
    const updatedBlog = await blogService.update({ ...blog, 'user': blog.user.id })
    let blogsList = blogs.map(b => b.id === updatedBlog.id ? { ...b, 'likes': blog.likes } : b)
    blogsList.sort((a, b) => a.likes > b.likes ? -1 : 1)
    setBlogs(blogsList)
  }

  const onClickDelete = async (blog) => {
    if(window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)){
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  if(!user) return (
    <>
      <Notification message = {notificationMessage.message} color = {notificationMessage.color}/>
      {loginForm()}
    </>
  )
  else return (
    <>
      <Notification message = {notificationMessage.message} color = {notificationMessage.color}/>
      <div>
        Welcome {user.name}!
        <Button text = 'Logout' onClick = {onLogOutClick} />
      </div>
      <Togglable buttonLabel = 'new blog' ref = {refBlogFormTogglable}>
        <BlogForm createBlog = {addBlog}></BlogForm>
      </Togglable>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} onClickLike = {onClickLike}
        onClickDelete = {onClickDelete} user = {user}/>)}
    </>
  )
}

export default App