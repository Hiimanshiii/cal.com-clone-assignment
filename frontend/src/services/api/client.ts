import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://calclone-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error?.response?.data?.message ??
      error?.message ??
      'Request failed';

    return Promise.reject(new Error(message));
  },
);
