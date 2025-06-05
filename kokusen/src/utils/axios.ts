import axios from 'axios';

import { API_TIMEOUT_SECONDS } from '@/utils/constants';

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: API_TIMEOUT_SECONDS * 1000,
  withCredentials: true,
  headers: {},
});
