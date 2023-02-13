import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import routes from '../routes';

const LogOutButton = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => {
        logOut();
        navigate(routes.loginPagePath());
      }}
      type="button"
      className="btn btn-primary"
    >
      {t('navbar.logOutButton')}
    </button>
  );
};

const NavBar = () => {
  const { isAuth } = useAuth();
  const path = isAuth ? routes.rootPagePath() : routes.loginPagePath();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to={path}>{t('navbar.mainLabel')}</Link>
        {location.pathname === routes.rootPagePath() ? <LogOutButton /> : null}
      </div>
    </nav>
  );
};

export default NavBar;
