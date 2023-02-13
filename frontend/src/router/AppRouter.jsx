import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Notfound from '../pages/Notfound';
import Signup from '../pages/Signup';
import routes from '../routes.js';
import PrivateRoute from './PrivateRoute';
import Main from '../pages/Main';

const AppRouter = () => (
  <Routes>
    <Route
      path={routes.rootPagePath()}
      element={(
        <PrivateRoute>
          <Main />
        </PrivateRoute>
      )}
    />
    <Route path={routes.loginPagePath()} element={<Login />} />
    <Route path={routes.signupPagePath()} element={<Signup />} />
    <Route path="*" element={<Notfound />} />
  </Routes>
);

export default AppRouter;
