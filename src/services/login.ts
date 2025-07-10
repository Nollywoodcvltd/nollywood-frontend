import axios from 'axios';
import { LoginType } from '../types';
const baseUrl = 'https://nollywood-api-5jn6.onrender.com/api/login';
// const baseUrl = 'http://localhost:3000/api/login';

const login = async (credentials: LoginType) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
