import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../../contexts/AuthContext';
import routes from '../../../routes';

const SignupForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const [userExists, setUserExists] = useState(false);
  const inputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('signUpForm.validation.requiredField')
        .min(3, 'signUpForm.validation.usernameLength')
        .max(20, 'signUpForm.validation.usernameLength'),
      password: Yup.string()
        .required('signUpForm.validation.requiredField')
        .min(6, 'signUpForm.validation.passwordLength'),
      confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'signUpForm.validation.confirmPassword'),
    }),
    onSubmit: async (values) => {
      const userData = values;
      try {
        const response = await axios.post(routes.signupPath(), userData);
        logIn(response.data);
        navigate(routes.rootPagePath());
      } catch (error) {
        formik.setSubmitting(false);

        if (error.code === 'ERR_NETWORK') {
          toast.error(t('notifications.errors.connectionError'));
          return;
        }
        if (error.isAxiosError && error.response.status === 409) {
          setUserExists(true);
          return;
        }
        throw error;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [userExists]);

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <fieldset disabled={formik.isSubmitting}>
        <h1 className="text-center mb-4">{t('signUpForm.header')}</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            ref={inputRef}
            placeholder={t('signUpForm.validation.usernameLength')}
            name="username"
            autoComplete="username"
            required
            id="username"
            isInvalid={(formik.touched.username && formik.errors.username)
              || userExists}
          />
          <Form.Label htmlFor="username">{t('signUpForm.usernameLabel')}</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            {t(formik.errors.username)}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('signUpForm.validation.passwordLength')}
            name="password"
            aria-describedby="passwordHelpBlock"
            required
            autoComplete="new-password"
            type="password"
            id="password"
            isInvalid={(formik.touched.password && formik.errors.password)
              || userExists}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {t(formik.errors.password)}
          </Form.Control.Feedback>
          <Form.Label htmlFor="password">{t('signUpForm.passwordLabel')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-4">
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('signUpForm.validation.confirmPassword')}
            name="confirmPassword"
            required
            autoComplete="new-password"
            type="password"
            id="confirmPassword"
            isInvalid={(formik.touched.confirmPassword && formik.errors.confirmPassword)
              || userExists}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.confirmPassword && !userExists ? t(formik.errors.confirmPassword) : ''}
            {userExists ? t('signUpForm.signUpFailed') : ''}
          </Form.Control.Feedback>
          <Form.Label htmlFor="confirmPassword">{t('signUpForm.confirmPasswordLabel')}</Form.Label>
        </Form.Group>
        <button type="submit" className="w-100 btn btn-outline-primary">{t('signUpForm.signUpButton')}</button>
      </fieldset>
    </Form>
  );
};

export default SignupForm;
