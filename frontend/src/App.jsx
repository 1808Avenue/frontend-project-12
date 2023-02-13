import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AppRouter from './router/AppRouter.jsx';

const App = () => (
  <AuthProvider>
    <AppRouter />
    <ToastContainer />
  </AuthProvider>
);

export default App;
