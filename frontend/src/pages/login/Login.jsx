import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import NavBar from '../common-components/navbar/NavBar.jsx';
import routes from '../../routes.js';
import LoginForm from './components/Form.jsx';

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Container fluid className="h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img style={{ widht: '200px', height: '200px', marginTop: '70px' }} src="./images/login_form.jpg" className="rounded-circle" alt="Войти" />
                </div>
                <LoginForm />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('logInForm.footer.signUpHeader')}</span>
                  <Link to={routes.signupPagePath()} className="text-decoration-none">{t('logInForm.footer.signUp')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
