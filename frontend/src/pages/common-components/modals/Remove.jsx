import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../../contexts/SocketContext.jsx';
import { hideModal, selectModalState } from '../../../slices/modalSlice.js';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeChannel } = useSocket();
  const [isRemoved, setIsRemoved] = useState(false);

  const { data } = useSelector(selectModalState);
  const remoteChannelId = data.id;

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  const handleRemoveChannel = async () => {
    try {
      setIsRemoved(true);
      await removeChannel({ id: remoteChannelId });
      handleHideModal();
      toast.success(t('notifications.success.channelRemoved'));
    } catch (error) {
      setIsRemoved(false);
      console.log(error);
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.removeChannel.header')}</Modal.Title>
        <CloseButton onClick={handleHideModal} aria-label="Close" data-bs-dismiss="modal" />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.removeChannel.body')}</p>
        <div className="d-flex justify-content-end">
          <Button
            onClick={handleHideModal}
            variant="secondary"
            className="me-2"
            disabled={isRemoved}
          >
            {t('modals.removeChannel.cancelButton')}
          </Button>
          <Button
            onClick={handleRemoveChannel}
            variant="danger"
            disabled={isRemoved}
          >
            {t('modals.removeChannel.removeButton')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default Remove;
