import axios from 'axios';




const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  withCredentials: true,
  // recibir cookies del servidor
  // enviar cookies al servidor
  headers: {
    'Content-Type': 'application/json',
  },

});

export default axiosInstance;