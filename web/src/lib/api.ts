import axios from 'axios'

export const api = axios.create({
  // baseURL: 'http://192.168.3.11:3333',
  baseURL: 'http://192.168.0.115:3333',
  // baseURL: 'http://localhost:3333'
  // baseURL: 'http://10.7.14.63:3333',
    
})
