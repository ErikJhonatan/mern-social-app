import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (user) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const data = { user, isAuthenticated, login, logout };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;

}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthProvider };