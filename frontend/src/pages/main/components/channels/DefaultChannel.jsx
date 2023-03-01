import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentChannelId, setCurrentChannel } from '../../../../slices/channelsSlice';

const DefaultChannel = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentChannelId = useSelector(selectCurrentChannelId);
  const active = channel.id === currentChannelId ? 'btn-primary' : '';

  const handleSwitchChannel = (id) => {
    dispatch(setCurrentChannel(id));
  };

  return (
    <li className="nav-item w-100">
      <button onClick={() => handleSwitchChannel(channel.id)} type="button" className={`w-100 rounded-0 text-start btn ${active}`}>
        <span className="me-1">{t('pageChat.channels.prefix')}</span>
        {channel.name}
      </button>
    </li>
  );
};

export default DefaultChannel;
