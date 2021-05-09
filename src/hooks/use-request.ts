import axios from 'axios';
import { useState } from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface iRequest<T, U> {
  url: string
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  body?: T
  onSuccess?(data: U): void
  onError?(err: any): void
}

axios.interceptors.request.use((config) => {
  const request = { ...config };
  const staticToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiZHVtbXkgc3RhdGljIHRva2VuIiwiaWF0IjoxNjIwNTQ1NjY0LCJleHAiOjE2MjMxMzc2NjR9.nxbpAbZ4kb5exQrK_ZhRl_qZlu600GJkDlZJvXftF14';
  request.headers.Authorization = `Bearer ${staticToken}`;
  return request;
}, (error) => {
  Promise.reject(error);
});

function useRequest<T, U>({ url, body, method, onSuccess, onError }: iRequest<T, U>) {
  const [error, setError] = useState(null);
  const doRequest = async (props = {}): Promise<U> => {
    try {
      setError(null);
      const config = {
        url,
        baseURL: BASE_URL,
        method,
        ...(
          body
            ? { data: { ...body } }
            : {}
        ),
        ...props,
      };
      const response = await axios(config);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      if (err.response) {
        // Request made and server responded
        // console.error(err.response.data);
        // console.error(err.response.status);
        // console.error(err.response.headers);
        setError(err.response);
        if (onError) {
          onError(err);
        }
        return err.response;
      }
      if (err.request) {
        // The request was made but no response was received
        // console.error(err.request);
        setError(err.request);
        if (onError) {
          onError(err.request);
        }
        return err.request;
      }
      // Something happened in setting up the request that triggered an Error
      // console.error('Error', err.message);
      setError(err.message);
      if (onError) {
        onError(err);
      }
      return err.message;
    }
  };
  return {
    doRequest,
    error,
  };
}

export default useRequest;
