import axios from 'axios';

// Created once, so components get the same functions on every render
// and can safely list them as useEffect dependencies
const api = {
  //GET request
  get: (url) => axios.get(url),

  //POST request
  post: (url, data) => axios.post(url, data),

  //PUT request
  put: (url, data) => axios.put(url, data),

  //PATCH request
  patch: (url, data) => axios.patch(url, data),

  //DELETE request
  del: (url) => axios.delete(url),
};

const useAxios = () => api;

export default useAxios;
