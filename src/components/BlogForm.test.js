import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('New Blog Form', () => {

  test('A new blog is added with correct info', () => {

    const mockNewBlog = jest.fn()

    const component = render(
      <BlogForm newBlog={mockNewBlog}/>
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#form')

    //console.log(title)
    fireEvent.change(title, { target: { value: 'Test Title' } })
    fireEvent.change(author, { target: { value: 'Test Author' } })
    fireEvent.change(url, { target: { value: 'Test Url' } })

    fireEvent.submit(form)

    //console.log(mockNewBlog.mock.calls[0][0].title)

    expect(mockNewBlog.mock.calls).toHaveLength(1)
    expect(mockNewBlog.mock.calls[0][0].title).toBe('Test Title')

  })
})
