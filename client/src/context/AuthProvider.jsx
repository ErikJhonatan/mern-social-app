
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  authLogin,
  authLogout,
  isLoggedIn,
  authMe,
} from '../services/Auth';


const AuthContext = createContext();

function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loadingAuth, setLoadingAuth] = useState(true);
  // Cargar estado inicial al montar el componente
  useEffect(() => {
    const checkAuth = async () => {
     try {
      const response = await isLoggedIn();
      if (response) {
        setUser(response.user);
        setIsAuthenticated(response.isAuthenticated);
      }
     } catch (error) {
       console.error(error);
     } finally {
        setLoadingAuth(false);
     }
    };
    checkAuth();
  }, []);


  const login = async (credentials) => {
    const response = await authLogin(credentials, setUser, setIsAuthenticated);
    return response;
  };

  const logout = () => {
    authLogout(setUser, setIsAuthenticated);
  };

  const data = { user, isAuthenticated, login, logout, loadingAuth };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;

}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthProvider };