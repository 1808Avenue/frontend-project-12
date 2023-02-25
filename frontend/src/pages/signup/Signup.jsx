import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import NavBar from '../common-components/navbar/NavBar.jsx';
import SignupForm from './components/Form';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img style={{ width: '200px', height: '200px', marginTop: '70px' }} src="./images/signup_form.jpg" className="rounded-circle" alt={t('signUpForm.header')} />
                </div>
                <SignupForm />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('signUpForm.footer.loginHeader')}</span>
                  <Link className="text-decoration-none" to={routes.loginPagePath()}>
                    {t('signUpForm.footer.backToLogin')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
