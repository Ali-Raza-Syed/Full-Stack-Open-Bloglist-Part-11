import { useState } from 'react'
import React  from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    'title': '',
    'author': '',
    'url': ''
  })

  const onNewBlogChange = ({ target }) => setNewBlog({ ...newBlog, [target.name]: target.value })
  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      'title': '',
      'author': '',
      'url': ''
    })
  }
  return(
    <form onSubmit={addBlog}>
      Title: <input id = 'title' name = 'title' value={newBlog.title} onChange = {onNewBlogChange}/>
      Author: <input id = 'author' name = 'author' value={newBlog.author} onChange = {onNewBlogChange}/>
      URL: <input id = 'url' name = 'url' value={newBlog.url} onChange = {onNewBlogChange}/>
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm