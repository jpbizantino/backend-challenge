import axios from 'axios'
import { API_BASE, API_TOKEN } from '../../common/config/config.js'

export const axiosClient = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + API_TOKEN

  return config
})
