import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import routes from '../routes';

const PrivateRoute = () => {
  const location = useLocation();
  const { isAuth } = useAuth();

  return isAuth
    ? <Outlet />
    : <Navigate to={routes.loginPagePath()} state={{ from: location.pathname }} />;
};

export default PrivateRoute;
