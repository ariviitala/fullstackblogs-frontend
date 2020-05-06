import axios from 'axios'
const baseUrl = '/api/login'

const login = async (loginInfo) => {
  const request = await axios.post(baseUrl, loginInfo)
  console.log(request.data)
  return request.data
}

export default { login }