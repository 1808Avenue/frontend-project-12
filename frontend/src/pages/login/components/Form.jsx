import axios from 'axios';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../../../routes';
import { useAuth } from '../../../contexts/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);

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
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <fieldset disabled={formik.isSubmitting}>
        <h1 className="text-center mb-4">{t('logInForm.header')}</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            onChange={formik.handleChange}
            ref={inputRef}
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
  );
};

export default LoginForm;
