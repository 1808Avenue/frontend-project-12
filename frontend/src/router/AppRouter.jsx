import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login.jsx';
import Notfound from '../pages/notfound/Notfound.jsx';
import Signup from '../pages/signup/Signup.jsx';
import routes from '../routes.js';
import PrivateRoute from './PrivateRoute.jsx';
import Main from '../pages/main/Main.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const AppRouter = () => {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route path={routes.rootPagePath()} element={<PrivateRoute />}>
        <Route path={routes.rootPagePath()} element={<Main />} />
      </Route>
      <Route
        path={routes.loginPagePath()}
        element={isAuth ? <Navigate to={routes.rootPagePath()} /> : <Login />}
      />
      <Route
        path={routes.signupPagePath()}
        element={isAuth ? <Navigate to={routes.rootPagePath()} /> : <Signup />}
      />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default AppRouter;
