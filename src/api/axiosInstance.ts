import axios from 'axios';

// http://34.61.40.13
export const axiosInstance = axios.create({
  // baseURL: 'https://honlife.kro.kr',
  baseURL: 'https://honlife.cedartodo.uk',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청을 보내기 전에 항상 이 코드를 실행시키겠다.
// config : 정상적으로 동작할때 보낼 코드, error: 에러가 발생했을 때 보낼 코드
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token');
    // 토큰이 있으면, headers가 있는지 없는지
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    // 세션 스토리지에 access_token이 저장되어있으면, 요청을 보낼때마다 Authorization 으로 토큰값을 포함시켜서 보내라는 뜻
  },
  (error) => Promise.reject(error),
);
