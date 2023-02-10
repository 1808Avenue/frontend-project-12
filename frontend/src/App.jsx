import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Chat from './pages/Chat.jsx';
import Notfound from './pages/Notfound.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
    <ToastContainer />
  </AuthProvider>
);

export default App;
