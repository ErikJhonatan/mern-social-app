import './App.css'

import { 
  BrowserRouter as Router, 
  Route,
  Routes,
  Navigate,
  Outlet
} from 'react-router'

import { useContext } from 'react';

import { AuthContext, AuthProvider } from './context/AuthProvider'

import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'

const ComprobatedLogin = () => {
  const { isAuthenticated, loadingAuth } = useContext(AuthContext);
  if (isAuthenticated && !loadingAuth) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
};

const ProtectedRoute = () => {
  const { isAuthenticated, loadingAuth } = useContext(AuthContext);
  if (!isAuthenticated && !loadingAuth) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<ComprobatedLogin />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
