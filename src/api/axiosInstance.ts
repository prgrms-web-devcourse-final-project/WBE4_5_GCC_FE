import axios from 'axios';

// http://34.61.40.13
export const axiosInstance = axios.create({
  //baseURL: 'https://honlife.kro.kr',
  baseURL: 'https://honlife.cedartodo.uk',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
