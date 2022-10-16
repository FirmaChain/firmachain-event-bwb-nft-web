import React, { useEffect } from 'react';

import Portal from './portal';

import { ModalOverlay, ModalWrapper, ModalInner } from './styles';

interface IProps {
  onClose: () => void;
  transparent?: boolean;
  visible: boolean;
  width: string;
  maskClosable?: boolean;
  children?: React.ReactNode;
}

const Modal = ({ onClose, transparent = false, visible, width, maskClosable = false, children }: IProps) => {
  const onMaskClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (maskClosable) {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }
  };

  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);

  return (
    <Portal elementId='modal-root'>
      <ModalOverlay visible={visible} transparent={transparent} />
      <ModalWrapper tabIndex={-1} visible={visible} onClick={onMaskClick}>
        <ModalInner tabIndex={0} width={width} transparent={transparent}>
          {children}
        </ModalInner>
      </ModalWrapper>
    </Portal>
  );
};

export default Modal;
