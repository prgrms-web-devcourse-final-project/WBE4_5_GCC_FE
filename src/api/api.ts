import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://34.61.40.13',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
