import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const getModal = (modalType) => modals[modalType];

const renderModal = (modalType, handlers, data) => {
  if (!modalType) {
    return null;
  }

  const Component = getModal(modalType);
  return <Component handlers={{ ...handlers }} data={data} />;
};

export default renderModal;
