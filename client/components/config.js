import axios from 'axios';

//here defines the base URL for the backend server
const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

export default axios;