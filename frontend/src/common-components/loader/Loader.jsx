import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';

const Loader = () => {
  const { t } = useTranslation();

  return (
    <div className="row justify-content-center align-content-center h-100">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">{t('loader')}</span>
      </Spinner>
    </div>
  );
};

export default Loader;
