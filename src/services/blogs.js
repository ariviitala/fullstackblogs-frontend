import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNewBlog = async (newBlog, user) => {
  console.log(token)
  const config = {
    headers: { 'Authorization': token }, 
  }

  const request = await axios.post(baseUrl, newBlog, config)
  return request.data  
}
export default { getAll, postNewBlog, setToken}