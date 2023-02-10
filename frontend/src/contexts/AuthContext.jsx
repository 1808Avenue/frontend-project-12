import { createContext, useContext, useMemo } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const logIn = (data) => localStorage.setItem('user', JSON.stringify(data));
  const logOut = () => localStorage.removeItem('user');
  const getAuthHeader = (token) => {
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  };

  const value = useMemo(() => ({
    logIn,
    logOut,
    getAuthHeader,
  }), []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
