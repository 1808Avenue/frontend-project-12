import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const NetworkError = () => {
  const { t } = useTranslation();

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.networkError.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.networkError.body')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={refreshPage} variant="danger">
            {t('modals.networkError.button')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default NetworkError;
