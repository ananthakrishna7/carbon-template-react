import { API_BASE_URL } from './config';

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
};

export const api = {
  get: (endpoint: string, options?: RequestInit) =>
    fetchApi(endpoint, { ...options, method: 'GET' }),

  post: (endpoint: string, data: any, options?: RequestInit) =>
    fetchApi(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: (endpoint: string, data: any, options?: RequestInit) =>
    fetchApi(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (endpoint: string, options?: RequestInit) =>
    fetchApi(endpoint, { ...options, method: 'DELETE' }),
};