import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { PopupModals } from '@/constants/PopupModals';

const ModalRoot = () => {
  const { isOpen, modalType, modalProps } = useSelector((state: RootState) => state.modal);

  if (!isOpen || !modalType) {
    return null;
  }

  const SpecificModal = PopupModals[modalType];
  return <SpecificModal {...modalProps} />;
};

export default ModalRoot;
