import {
  createContext, useContext, useEffect, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  addChannel, deleteChannel, setCurrentChannel, updateChannel,
} from '../slices/channelsSlice';
import { addMessage } from '../slices/messagesSlice';

const SocketIoContext = createContext({});

const SockeIoProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });

    socket.on('removeChannel', (id) => {
      dispatch(deleteChannel(id));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(updateChannel(channel));
    });
  }, []);

  const sendMessage = (message) => (new Promise((resolve, reject) => {
    socket.timeout(5000).emit('newMessage', message, (err, response) => {
      if (response?.status === 'ok') {
        resolve(response);
      } else {
        reject(err);
      }
    });
  }));

  const createChannel = (channel) => (new Promise((resolve, reject) => {
    socket.timeout(5000).emit('newChannel', channel, (err, response) => {
      if (response?.status === 'ok') {
        const newChannelId = response.data.id;
        dispatch(setCurrentChannel(newChannelId));
        resolve(response);
      } else {
        reject(err);
      }
    });
  }));

  const removeChannel = (id) => (new Promise((resolve, reject) => {
    socket.timeout(5000).emit('removeChannel', id, (err, response) => {
      if (response?.status === 'ok') {
        resolve(response);
      } else {
        reject(err);
      }
    });
  }));

  const renameChannel = (channel) => (new Promise((resolve, reject) => {
    socket.timeout(5000).emit('renameChannel', channel, (err, response) => {
      if (response?.status === 'ok') {
        resolve(response);
      } else {
        reject(err);
      }
    });
  }));

  const value = useMemo(() => ({
    sendMessage,
    createChannel,
    removeChannel,
    renameChannel,
  }), []);

  return (
    <SocketIoContext.Provider value={value}>
      {children}
    </SocketIoContext.Provider>
  );
};

const useSocket = () => useContext(SocketIoContext);

export { SockeIoProvider, useSocket };
