import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import {
  fetchContent, loadingProcess, selectChannels, selectFetchError, selectLoadingStatus,
} from '../../../../slices/channelsSlice';
import NewChannel from './NewChannel';
import DefaultChannel from './DefaultChannel';
import { useAuth } from '../../../../contexts/AuthContext';
import Loader from '../../../common-components/loader/Loader.jsx';
import { showModal, selectModalState } from '../../../../slices/modalSlice';
import ChannelModal, { modalTypes } from '../../../common-components/modals/index.jsx';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAuthHeader, logOut } = useAuth();

  const channels = useSelector(selectChannels);
  const loadingStatus = useSelector(selectLoadingStatus);
  const fetchError = useSelector(selectFetchError);
  const { isOpened } = useSelector(selectModalState);

  const handleNewChannel = () => {
    dispatch(showModal({ type: modalTypes.ADDING }));
  };

  useEffect(() => {
    dispatch(fetchContent(getAuthHeader));
  }, []);

  if (loadingStatus === loadingProcess.LOADING) {
    return <Loader />;
  }

  if (fetchError) {
    if (fetchError.code === 'ERR_BAD_REQUEST') {
      logOut();
    } else {
      dispatch(showModal({ type: modalTypes.ERROR }));
    }
  }

  return (
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
        {channels.map((channel) => (channel.removable
          ? <NewChannel channel={channel} key={channel.id} />
          : <DefaultChannel channel={channel} key={channel.id} />
        ))}
      </ul>
      <Modal centered show={isOpened}>
        <ChannelModal />
      </Modal>
    </div>
  );
};

export default Channels;
