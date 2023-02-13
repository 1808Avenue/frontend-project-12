import { useFormik } from 'formik';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import NavBar from '../components/NavBar.jsx';
import routes from '../routes.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logIn, isAuth } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputEl = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      const { username, password } = values;
      try {
        const response = await axios.post(routes.loginPath(), { username, password });
        logIn(response.data);
        navigate(routes.rootPagePath());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.code === 'ERR_NETWORK') {
          toast.error(t('notifications.errors.connectionError'));
          return;
        }
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        throw error;
      }
    },
  });

  useEffect(() => {
    if (isAuth) {
      navigate(routes.rootPagePath());
      return;
    }

    inputEl.current.focus();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Container fluid className="h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="./images/form_img.jpeg" className="rounded-circle" alt="Войти" />
                </div>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <fieldset disabled={formik.isSubmitting}>
                    <h1 className="text-center mb-4">{t('logInForm.header')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        ref={inputEl}
                        id="username"
                        name="username"
                        autoComplete="off"
                        placeholder={t('logInForm.usernameLabel')}
                        isInvalid={authFailed}
                        required
                      />
                      <Form.Label htmlFor="username">{t('logInForm.usernameLabel')}</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        onChange={formik.handleChange}
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder={t('logInForm.passwordLabel')}
                        type="password"
                        isInvalid={authFailed}
                        required
                      />
                      <Form.Label htmlFor="password">{t('logInForm.passwordLabel')}</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {authFailed ? t('logInForm.logInFailed') : null}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100 mb-3" variant="outline-primary">
                      {t('logInForm.logInButton')}
                    </Button>
                  </fieldset>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('logInForm.footer.signUpHeader')}</span>
                  <Link to="/signup" className="text-decoration-none">{t('logInForm.footer.signUp')}</Link>
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
