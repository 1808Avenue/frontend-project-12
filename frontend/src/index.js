import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.jsx';

const app = async () => {
  const socketInstance = io();
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init(socketInstance));
};

app();
