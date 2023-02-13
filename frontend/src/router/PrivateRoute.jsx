import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import routes from '../routes';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useAuth();

  return isAuth
    ? children
    : <Navigate to={routes.loginPagePath()} state={{ from: location.pathname }} />;
};

export default PrivateRoute;
