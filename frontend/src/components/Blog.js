import React, { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, onClickLike, onClickDelete, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const buttonText = showDetails ? 'hide' : 'show'
  const showRemoveButton = user.username === blog.user.username
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style = {blogStyle} className = 'blog'>
      <div className = 'header'>
        {blog.title} &nbsp; {blog.author}
        <Button onClick={toggleShowDetails} text = {buttonText}/>
      </div>
      <div style={{ display: showDetails ? '' : 'none' }} className = 'details'>
        <div> url: {blog.url} </div>
        <div> user: {blog.user.name} </div>
        <div id = 'like-div'>
          likes: {blog.likes}
          <Button text = {'like'} onClick = {() => onClickLike({ ...blog, 'likes': blog.likes + 1 })}/>
          <div id = 'del-div' style = {{ display: showRemoveButton ? '' : 'none' }}>
            <Button text = {'delete'} onClick = {() => onClickDelete({ ...blog })}/>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Blog
