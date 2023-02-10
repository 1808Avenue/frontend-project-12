import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { toast } from 'react-toastify';

const Remove = (props) => {
  const { handlers, data } = props;
  const { hideModal, handleRemoveChannel } = handlers;
  const currentChannel = data;
  const { t } = useTranslation();

  return (
    <Modal centered show>
      <Modal.Header>
        <Modal.Title>{t('modals.removeChannel.header')}</Modal.Title>
        <CloseButton onClick={hideModal} aria-label="Close" data-bs-dismiss="modal" />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.removeChannel.body')}</p>
        <div className="d-flex justify-content-end">
          <Button
            onClick={hideModal}
            variant="secondary"
            className="me-2"
          >
            {t('modals.removeChannel.cancelButton')}
          </Button>
          <Button
            onClick={() => {
              handleRemoveChannel({ id: currentChannel.id });
              hideModal();
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
