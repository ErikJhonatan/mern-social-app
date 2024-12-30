import Cookies from 'js-cookie';
import axiosInstance from '../config/axios.config';
const authLogin = async (data, setUser, setIsAuthenticated) => {
  try {
    const userData = await axiosInstance.post('/auth/login', data);
    setUser(userData.data);
    setIsAuthenticated(true);
    return userData;
  } catch (error) {
    const status = error.response.status;
    if (status === 401) {
      setIsAuthenticated(false);
      setUser(null);
    }
    return error;
  }
}

const authLogout = (setUser, setIsAuthenticated) => {
  try {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove('token');
    axiosInstance.get('/auth/logout');
  } catch (error) {
    console.error(error);
  }
};

const isLoggedIn = async () => {
  try {   
    const response = await axiosInstance.get('/auth/is-logged-in');
    if (response.data.loggedIn) {
      const user = await authMe();
      return {
        user,
        isAuthenticated: true,
      }
    }
  } catch (error) {
    const status =error.response.status;
    console.error(error);
    if (status === 401) {
      Cookies.remove('token');
      return {
        user: null,
        isAuthenticated: false,
      }
    }   
  }
}

const authMe = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export {
  authLogin,
  authLogout,
  isLoggedIn,
  authMe,
}
