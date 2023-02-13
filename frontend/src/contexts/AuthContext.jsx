import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const token = user?.token;
  const [isAuth, setIsAuth] = useState(!!user?.token);

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setIsAuth(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setIsAuth(false);
  };

  const getAuthHeader = () => {
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  };

  const value = useMemo(() => ({
    user,
    isAuth,
    logIn,
    logOut,
    getAuthHeader,
  }), [isAuth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
