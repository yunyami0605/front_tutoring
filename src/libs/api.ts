import axios from 'axios';
import { useAccessTokenStore } from '../features/auth/_stores/accessToken.store';

export const apiCall = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

apiCall.interceptors.request.use((config) => {
  const token = useAccessTokenStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // CSRF X-XSRF
  }

  return config;
});
