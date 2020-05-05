import React, {useState} from 'react'


const Blog = ({ blog, likeBlog, user, removeBlog }) => {
  const [showInfo, setShowInfo] = useState(false)
  
  const toggleShow = (event) => {
    event.preventDefault()
    setShowInfo(!showInfo)
  }

  const buttonText = () => {
    if (showInfo) {
      return 'hide'
    } else {
      return 'view'
    }
  }

  const likeHandler = (event) => {
    event.preventDefault()
    console.log('Liked')
    likeBlog(blog)
  }

  const removeHandler = (event) => {
    event.preventDefault()
    const result = window.confirm(`Remove ${blog.title} ${blog.author}?`)
    
    if (result){
      removeBlog(blog)
    }
    
  }

  const removeButton = () => {
    console.log(user)
    console.log(blog)
    if(user && (user.username === blog.user.username)){
      return (<form onSubmit={removeHandler}><button type='submit'>Remove</button></form>)
    } else {
      return ('')
    }
  }

  const infoBox = () => {
    if (showInfo) {
      return (
        <div>
          <div>{blog.url}</div>
          <div>
            <form onSubmit={likeHandler}>
              likes {blog.likes} 
              <button type='submit'>like</button>
            </form>
          </div>
          <div>{blog.user.name}</div>
          {removeButton()}
        </div>
      )
    
    } else {
      return ''
    }
  }
  return (
    <div>
      <form onSubmit={toggleShow}>
        {blog.title} {blog.author} 
        <button type='submit'>{buttonText()}</button>
      </form>
      {infoBox()}
    </div>
  )

}

export default Blog
