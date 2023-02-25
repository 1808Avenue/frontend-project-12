import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import routes from '../routes';

const PrivateRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (location.pathname === routes.loginPagePath()) {
    return user
      ? <Navigate to={routes.rootPagePath()} state={{ from: location.pathname }} />
      : <Outlet />;
  }

  if (location.pathname === routes.signupPagePath()) {
    return user
      ? <Navigate to={routes.rootPagePath()} state={{ from: location.pathname }} />
      : <Outlet />;
  }

  return user
    ? <Outlet />
    : <Navigate to={routes.loginPagePath()} state={{ from: location.pathname }} />;
};

export default PrivateRoute;
