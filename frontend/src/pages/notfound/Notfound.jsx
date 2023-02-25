import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import NavBar from '../common-components/navbar/NavBar.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import routes from '../../routes.js';

const Notfound = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const path = user ? routes.rootPagePath() : routes.loginPagePath();

  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <div className="text-center">
        <img className="img-fluid h-25" alt={t('pageNotFound.notFound')} src="./images/not_found_img.svg" />
        <h1 className="h4 text-muted">{t('pageNotFound.notFound')}</h1>
        <p className="text-muted">
          {t('pageNotFound.prompt')}
          {' '}
          <Link to={path}>
            {t('pageNotFound.returnButton')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Notfound;
