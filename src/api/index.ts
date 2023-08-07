import axios from 'axios'

const { BASE_URL } = process.env
const baseApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default baseApi
