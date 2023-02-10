import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as leoProfanity from 'leo-profanity';
import { useAuth } from '../contexts/AuthContext';
import routes from '../routes';
import { addContent } from '../slices/chatSlice';
import { useSocket } from '../contexts/SocketContext';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import renderModal from '../components/modals/index.jsx';
import NavBar from '../components/NavBar';

const Chat = () => {
  const { sendMessage } = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const inputEl = useRef(null);
  const content = useSelector((store) => store.chat.content);
  const { t } = useTranslation();

  const { channels, currentChannelId, messages } = content;
  const messageCount = messages.filter(({ channelId }) => channelId === currentChannelId).length;
  const [currentChannel] = channels.filter(({ id }) => id === currentChannelId);

  const [modalType, setModalType] = useState(null);
  const hideModal = () => setModalType(null);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values, { resetForm }) => {
      const { username } = JSON.parse(localStorage.getItem('user'));
      sendMessage({
        body: leoProfanity.clean(values.body),
        channelId: currentChannelId,
        username,
      });
      resetForm(formik.initialValues);
    },
  });

  const handleNewChannel = () => {
    setModalType('adding');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate(routes.loginPagePath());
      return;
    }

    const fetchContent = async () => {
      try {
        const { data } = await axios
          .get(routes.contentPath(), { headers: getAuthHeader(user.token) });

        dispatch(addContent(data));
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          toast.error(t('notifications.errors.connectionError'));
          return;
        }
        throw error;
      }
    };

    fetchContent();
  }, []);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
              <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <span>{t('pageChat.channels.header')}</span>
                <button onClick={handleNewChannel} type="button" className="p-0 text-primary btn btn-group-vertical">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                  <span className="visually-hidden">{t('pageChat.channels.addChannelButton')}</span>
                </button>
              </div>
              <ul className="nav flex-column nav-pills nav-fill px-2">
                <Channels
                  channels={channels}
                  currentChannelId={currentChannelId}
                  inputEl={inputEl}
                />
              </ul>
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0">
                    <b>
                      {currentChannel && `${t('pageChat.channels.prefix')} ${currentChannel.name}`}
                    </b>
                  </p>
                  <span className="text-muted">
                    {messages && `${messageCount} ${t('pageChat.messageForm.allMessages')}`}
                  </span>
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                  <Messages messages={messages} currentChannelId={currentChannelId} />
                </div>
                <div className="mt-auto px-5 py-3">
                  <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
                    <Form.Group className="input-group has-validation">
                      <Form.Control
                        onChange={formik.handleChange}
                        ref={inputEl}
                        name="body"
                        aria-label={t('pageChat.messageForm.inputLabel')}
                        placeholder={t('pageChat.messageForm.input')}
                        className="border-0 p-0 ps-2"
                        autoComplete="off"
                        value={formik.values.body}
                      />
                      <button type="submit" disabled={!formik.values.body.trim()} className="btn btn-group-vertical">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fillRule="currentColor">
                          <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                        </svg>
                        <span className="visually-hidden">{t('pageChat.messageForm.submitButton')}</span>
                      </button>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderModal(modalType, { hideModal })}
    </>
  );
};

export default Chat;
