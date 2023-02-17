import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
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
  const { t, i18n } = useTranslation();
  const { changeLanguage } = i18n;
  const currentLanguage = i18n.language;

  const handleSwitchLanguage = () => {
    changeLanguage(currentLanguage === 'ru' ? 'en' : 'ru');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Row>
          <Col>
            <Link className="navbar-brand" to={path}>{t('navbar.mainLabel')}</Link>
          </Col>
        </Row>
        <Row>
          <ButtonGroup>
            {location.pathname === routes.rootPagePath() ? <LogOutButton /> : null}
            {
              location.pathname === routes.rootPagePath()
                ? (
                  <DropdownButton variant="outline-secondary" as={ButtonGroup} title={currentLanguage} id="bg-nested-dropdown">
                    <Dropdown.Item onClick={handleSwitchLanguage} eventKey="1">
                      {currentLanguage === 'ru' ? 'English' : 'Russian'}
                    </Dropdown.Item>
                  </DropdownButton>
                )
                : <Button onClick={handleSwitchLanguage} variant="outline-secondary">{currentLanguage}</Button>
            }
          </ButtonGroup>
        </Row>
        {/* <Link className="navbar-brand" to={path}>{t('navbar.mainLabel')}</Link>
        {location.pathname === routes.rootPagePath() ? <LogOutButton /> : null} */}
      </div>
    </nav>
  );
};

export default NavBar;
