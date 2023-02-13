import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../contexts/SocketContext';
import { hideModal, selectModalState } from '../../slices/modalSlice';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeChannel } = useSocket();
  const { data } = useSelector(selectModalState);
  const remoteChannelId = data.id;

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  return (
    <Modal centered show>
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
          >
            {t('modals.removeChannel.cancelButton')}
          </Button>
          <Button
            onClick={() => {
              removeChannel({ id: remoteChannelId });
              handleHideModal();
              toast.success(t('notifications.success.channelRemoved'));
            }}
            variant="danger"
          >
            {t('modals.removeChannel.removeButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
