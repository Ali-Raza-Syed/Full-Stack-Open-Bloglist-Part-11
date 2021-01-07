import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import { render, fireEvent } from '@testing-library/react'


describe('BlogForm', () => {
  let component
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <BlogForm createBlog = {mockHandler}/>
    )
  })

  test.only('createBlog event handler called with correct content', () => {
    const form = component.container.querySelector('form')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const title = component.container.querySelector('#title')

    fireEvent.change(author, {
      target: { value: 'author1' }
    })
    fireEvent.change(url, {
      target: { value: 'url1' }
    })
    fireEvent.change(title, {
      target: { value: 'title1' }
    })

    fireEvent.submit(form)

    expect(mockHandler.mock.calls[0][0].title).toBe('title1' )
    expect(mockHandler.mock.calls[0][0].author).toBe('author1' )
    expect(mockHandler.mock.calls[0][0].url).toBe('url1' )
  })
})