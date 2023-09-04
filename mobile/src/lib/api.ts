import axios from 'axios'

export const api = axios.create({
  // baseURL: 'http://192.168.3.11:3333',
  baseURL: 'http://192.168.0.110:3333',
})
