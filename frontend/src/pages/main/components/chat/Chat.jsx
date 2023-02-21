import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as leoProfanity from 'leo-profanity';
import { useSocket } from '../../../../contexts/SocketContext';
import { selectCurrentChannel, selectCurrentChannelId } from '../../../../slices/channelsSlice';
import { selectCurrentChannelMessages, selectLastMessage } from '../../../../slices/messagesSlice';
import Messages from '../messages/Messages';
import { useAuth } from '../../../../contexts/AuthContext';

const Chat = () => {
  const { user: { username } } = useAuth();
  const { t } = useTranslation();
  const { sendMessage } = useSocket();
  const inputRef = useRef(null);
  const lastMessageRef = useRef(null);

  const [currentChannel] = useSelector(selectCurrentChannel);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const messages = useSelector(selectCurrentChannelMessages);

  const lastMessage = useSelector(selectLastMessage);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (values.body.trim()) {
          await sendMessage({
            body: leoProfanity.clean(values.body),
            channelId: currentChannelId,
            username,
          });
        }
        resetForm();
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, lastMessage]);

  useEffect(() => {
    if (lastMessage && lastMessage.username === username) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lastMessage]);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView();
  }, [currentChannelId]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {currentChannel && `${t('pageChat.channels.prefix')} ${currentChannel.name}`}
            </b>
          </p>
          <span className="text-muted">
            {messages && `${t('pageChat.pluralMessageCount.message', { count: messages.length })}`}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          <Messages />
          <span ref={lastMessageRef} />
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
            <fieldset disabled={formik.isSubmitting}>
              <Form.Group className="input-group has-validation">
                <Form.Control
                  onChange={formik.handleChange}
                  ref={inputRef}
                  name="body"
                  aria-label={t('pageChat.messageForm.inputLabel')}
                  placeholder={t('pageChat.messageForm.input')}
                  className="border-0 p-0 ps-2"
                  autoComplete="off"
                  value={formik.values.body}
                />
                <button type="submit" className="btn btn-group-vertical">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fillRule="currentColor">
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                  </svg>
                  <span className="visually-hidden">{t('pageChat.messageForm.submitButton')}</span>
                </button>
              </Form.Group>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
