import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blogs', () => {
  let component
  let mockLike
  let mockRemove

  beforeEach(() => {
    const blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'Tets url',
      likes: 10,
      user: { name: 'Pekka', username: 'pekka' }
    }
    const user = { username: 'pekka' }

    mockLike = jest.fn()
    mockRemove = jest.fn()

    component = render(
      <Blog blog={blog} user={user} likeBlog={mockLike} removeBlog={mockRemove}/>
    )
  })

  test('Renders content', () => {
    //component.debug()
    //console.log(component.container.textContent)
    expect(component.container).toHaveTextContent('Test blog')
    expect(component.container).toHaveTextContent('Test author')
    expect(component.container).not.toHaveTextContent('Pekka')
  })

  test('Shows info', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    //component.debug()
    const likeForm = component.container.querySelector('.likeForm')

    expect(likeForm).toHaveTextContent('10')

    expect(component.container).toHaveTextContent('url')
    expect(component.container).toHaveTextContent('hide')
  })

  test('Can like', () => {
    fireEvent.click(component.getByText('view'))

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLike.mock.calls).toHaveLength(2)
  })

})
