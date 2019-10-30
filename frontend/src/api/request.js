import axios from 'axios'
require('dotenv').config()

// Create axios instance
const service = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: 15000
})

// response interceptors
service.interceptors.response.use(
  response => {
    /**
     * The code is non-20000 error-free
     */
    if (!response || !response.data) {
      return { code: 500, data: null, error: 'Something went wrong...' }
    }

    const res = response.data
    if (res.code !== 200 && res.code !== 201) {
      return { code: 500, data: null, error: 'Something went wrong...' }
    } else {
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
