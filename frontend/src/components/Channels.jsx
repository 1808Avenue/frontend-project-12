import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import { setCurrentChannel } from '../slices/chatSlice';
import renderModal from './modals';
import { useSocket } from '../contexts/SocketContext';

const Channels = ({ channels, currentChannelId, inputEl }) => {
  const { removeChannel, renameChannel } = useSocket();
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState(null);
  const hideModal = () => setModalType(null);
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current.focus();
    animateScroll.scrollToBottom({
      containerId: 'messages-box',
      duration: 0,
      delay: 0,
      smooth: 'true',
    });
  }, [currentChannelId, channels]);

  const handleSwitchChannel = (id) => {
    dispatch(setCurrentChannel(id));
  };
  const handleRemoveChannel = (id) => removeChannel(id);
  const handleRenameChannel = (channel) => renameChannel(channel);
  const handlers = {
    hideModal,
    handleRemoveChannel,
    handleRenameChannel,
  };

  const DefaultChannel = ({ channel }) => {
    const active = channel.id === currentChannelId ? 'btn-secondary' : '';

    return (
      <li className="nav-item w-100">
        <button onClick={() => handleSwitchChannel(channel.id)} type="button" className={`w-100 rounded-0 text-start btn ${active}`}>
          <span className="me-1">{t('pageChat.channels.prefix')}</span>
          {channel.name}
        </button>
      </li>
    );
  };

  const NewChannel = ({ channel }) => {
    const active = channel.id === currentChannelId ? 'btn-secondary' : '';

    return (
      <>
        <li className="nav-item w-100">
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button onClick={() => handleSwitchChannel(channel.id)} variant={active} className={`w-100 rounded-0 text-start text-truncate ${active}`}>
              <span className="me-1">{t('pageChat.channels.prefix')}</span>
              {channel.name}
            </Button>
            <Dropdown.Toggle variant={active} className={`flex-grow-0 ${active}`} split>
              <span className="visually-hidden">{t('pageChat.channels.channelControl')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setModalType('removing')} eventKey="1">{t('pageChat.channels.removeChannelButton')}</Dropdown.Item>
              <Dropdown.Item onClick={() => setModalType('renaming')} eventKey="2">{t('pageChat.channels.renameChannelButton')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        {renderModal(modalType, handlers, channel)}
      </ >
    );
  };

  return (
    channels.map((channel) => (channel.removable
      ? <NewChannel channel={channel} key={channel.id} />
      : <DefaultChannel channel={channel} key={channel.id} />
    ))
  );
};

export default Channels;
