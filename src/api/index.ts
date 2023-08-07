import axios from 'axios'

const { BASE_URL } = import.meta.env
const baseApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default baseApi
