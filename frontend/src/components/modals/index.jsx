import { useSelector } from 'react-redux';
import { selectModalState } from '../../slices/modalSlice.js';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

export const modalTypes = {
  ADDING: 'adding',
  REMOVING: 'removing',
  RENAMING: 'renaming',
};

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};


const getModal = (modalType) => modals[modalType];


const ChannelModal = () => {
  const { isOpened, type } = useSelector(selectModalState);

  if (!isOpened) {
    return null;
  }

  const Component = getModal(type);

  return <Component />
};


export default ChannelModal;
