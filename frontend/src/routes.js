const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  contentPath: () => [apiPath, 'data'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  rootPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
};
