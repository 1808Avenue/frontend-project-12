import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { selectCurrentChannelId, setCurrentChannel } from '../../../../slices/channelsSlice';
import { showModal } from '../../../../slices/modalSlice';
import { modalTypes } from '../../../common-components/modals/index.jsx';

const NewChannel = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentChannelId = useSelector(selectCurrentChannelId);
  const active = channel.id === currentChannelId ? 'btn-primary' : '';

  const handleRemoveChannel = (id) => {
    dispatch(showModal({ type: modalTypes.REMOVING, data: { id } }));
  };

  const handleRenameChannel = (currentChannel) => {
    dispatch(showModal({ type: modalTypes.RENAMING, data: { ...currentChannel } }));
  };

  const handleSwitchChannel = (id) => {
    dispatch(setCurrentChannel(id));
  };

  return (
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
          <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)} eventKey="1">{t('pageChat.channels.removeChannelButton')}</Dropdown.Item>
          <Dropdown.Item onClick={() => handleRenameChannel(channel)} eventKey="2">{t('pageChat.channels.renameChannelButton')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default NewChannel;
