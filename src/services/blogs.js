import axios from 'axios'
const baseUrl = '/api/blogs/'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNewBlog = async (newBlog, user) => {
  //console.log(token)
  const config = {
    headers: { 'Authorization': `bearer ${user.token}` },
  }

  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const likeBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}${blog.id}`, { likes: blog.likes + 1 })
  console.log(response.data)
  return response.data
}

const removeBlog = async (blog, user) => {

  const config = {
    headers: { 'Authorization': `bearer ${user.token}` },
  }

  const response = await axios.delete(`${baseUrl}${blog.id}`, config)
  console.log(response.data)
}

export default { getAll, postNewBlog, likeBlog, removeBlog }