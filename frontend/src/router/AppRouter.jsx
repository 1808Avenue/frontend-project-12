import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login.jsx';
import Notfound from '../pages/notfound/Notfound.jsx';
import Signup from '../pages/signup/Signup.jsx';
import routes from '../routes.js';
import PrivateRoute from './PrivateRoute.jsx';
import Main from '../pages/main/Main.jsx';

const AppRouter = () => (
  <Routes>
    <Route path={routes.rootPagePath()} element={<PrivateRoute />}>
      <Route path={routes.rootPagePath()} element={<Main />} />
    </Route>
    <Route path={routes.loginPagePath()} element={<PrivateRoute />}>
      <Route path={routes.loginPagePath()} element={<Login />} />
    </Route>
    <Route path={routes.signupPagePath()} element={<PrivateRoute />}>
      <Route path={routes.signupPagePath()} element={<Signup />} />
    </Route>
    <Route path="*" element={<Notfound />} />
  </Routes>
);

export default AppRouter;
