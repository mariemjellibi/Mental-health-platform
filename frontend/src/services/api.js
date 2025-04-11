import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5002/api',
  withCredentials: true, // For cookie-based auth
});

export default API;
