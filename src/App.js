import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


const Notification = ({message}) => {

  if (message === null) {
      return null
  }

  return (
      <div className={message.type}>
          {message.text}
      </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }, [])

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('loggedBlogger')))
    
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogger')
    setUser(null)
  }

  const displayMessage = (type, text, duration=5000) => {
    setNotification({text: text, type: type})
        setTimeout(() => {
            setNotification(null)
        }, duration)
  }

  const handleLogin = async (creds) => {
    try {
      const user = await loginService.login(creds)
      window.localStorage.setItem('loggedBlogger', JSON.stringify(user))
      console.log(user)
      //console.log(user)

      setUser(user)

    } catch (exception) {
      displayMessage('error', 'Invalid username or password')
    }
  }

  const newBlog = async (blog) => {
    try {
      const addedBlog = await blogService.postNewBlog(blog, user)
      setBlogs(blogs.concat(addedBlog))
      displayMessage('success', `Added blog ${blog.title} by ${blog.author}`)
      
    } catch(error) {
      displayMessage('error', 'Error occured while adding a blog')
      console.log('Pieleen meni')
    }
  }

  const likeBlog = async (blog) => {
    try {
      const likedBlog = await blogService.likeBlog(blog)
      console.log(likedBlog)
      setBlogs(blogs.map(b => b.id === blog.id ? likedBlog : b))
      //setBlogs(blogs.map(b => b.id === blog.id ? {...blog, likes: blog.likes + 1} : b))
    } catch (error) {
      console.log(error)
    }
  }

  const removeBlog = async (blog) => {
    try {
      blogService.removeBlog(blog, user)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch(error) {
      displayMessage('error', 'Blog was not removed')
    }
  }

  const loginForm = () => {

      if (!user){
        return (
        <Togglable buttonLabel='Log in'>
        <LoginForm handleLogin={handleLogin}/>
        </Togglable> )
      } else {
        return (
        <div>
          <div>You are logged in as {user.name}</div>
          <form onSubmit={handleLogout}>
            <button type='submit'>Log Out</button>
          </form>
        </div>
        )
      }

  }



      return (
        <div>
        <h1>Blogs</h1>
        <Notification message={notification}/>
        {/*  <div>{user.name} logged in</div> */}
        {loginForm()}
        <br></br>
        <Togglable buttonLabel='Add new blog'>
        <BlogForm newBlog={newBlog}/>
        </Togglable>
        <h2>Hot Blogs</h2>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} user={user} removeBlog={removeBlog}/>
        )}
      </div>
      )
    
  
}

export default App