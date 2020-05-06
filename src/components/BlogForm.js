import React, { useState } from 'react'

const BlogForm = (props) => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.newBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')

  }

  return (
    <div>
      <h2>Insert new blog</h2>
      <form id='form' onSubmit={handleNewBlog}>
        <div>Title:<input id='title' value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}/></div>
        <div>Author:<input id='author' value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}/></div>
        <div>Url:<input id='url' value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}/></div>
        <div><button type='submit'>Create</button></div>
      </form>
    </div>
  )
}

export default BlogForm