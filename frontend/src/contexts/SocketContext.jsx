import {
  createContext, useContext, useEffect, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  addMessage, addChannel, deleteChannel, updateChannel,
} from '../slices/chatSlice';

const SocketIoContext = createContext({});

const SockeIoProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel)); // { id: 6, name: "new channel", removable: true }
    });

    socket.on('removeChannel', (id) => {
      dispatch(deleteChannel(id)); // { id: 8 };
    });

    socket.on('renameChannel', (channel) => {
      dispatch(updateChannel(channel)); // { id: 7, name: "new name channel", removable: true }
    });
  }, []);

  const sendMessage = (message) => socket.emit('newMessage', message); // {body: 'hello', channelId: 1, username: 'admin'}

  const createChannel = (channel) => socket.emit('newChannel', channel); // { name: "new channel" };

  const removeChannel = (id) => socket.emit('removeChannel', id); // { id: 8 }

  const renameChannel = (channel) => socket.emit('renameChannel', channel);

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
