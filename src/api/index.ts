import axios from 'axios'

const baseApi = axios.create({
  baseURL: 'http://43.202.116.245:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default baseApi
