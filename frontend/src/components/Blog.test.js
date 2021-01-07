import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import { render, fireEvent } from '@testing-library/react'

describe('Blog', () => {
  let component
  let mockHandler
  beforeEach(() => {
    const blog = {
      'title': 'title1',
      'author': 'author1',
      'likes': 100,
      'url': 'url1',
      'user': {
        'name': 'name1',
        'username': 'username1'
      }
    }
    const user = {
      'username': 'username1'
    }
    mockHandler = jest.fn()
    component = render(
      <Blog blog= {blog} user = {user} onClickLike = {mockHandler}/>
    )
  })

  test('does not show url and likes by default', () => {
    const divHeader = component.container.querySelector('.header')
    expect(divHeader).not.toHaveStyle('display: none')
    const divDetails = component.container.querySelector('.details')
    expect(divDetails).toHaveStyle('display: none')
  })

  test('url and likes shown after \'show\' button clicked', () => {
    const showButton = component.getByText('show')
    fireEvent.click(showButton)
    const divDetails = component.container.querySelector('.details')
    expect(divDetails).not.toHaveStyle('display: none')
  })

  test('\'like\' button when clicked twice calls corresponding event handler twice too', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})