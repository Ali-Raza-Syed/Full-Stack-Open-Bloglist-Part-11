import React from 'react'

const Notification = ({ message, color }) => {
  const style = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 1
  }

  if (!message) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification