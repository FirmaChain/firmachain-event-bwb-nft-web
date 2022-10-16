import React from 'react';
import styled from 'styled-components';

import Modal from './modal';

import { Button, ButtonWrapper, ModalContainer, SubText, TitleText } from '../../styles';
import { createTextEllipsis } from '../../utils/common';

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0 2rem;
`;

export const AddressWrapper = styled.div`
  background-color: #14141a;
  border-radius: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  gap: 1rem;
  margin-top: 1rem;
`;

export const DenomIcon = styled.div<{ src: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  background-image: url('${(props) => props.src}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

interface IProps {
  address: string;
  visible: boolean;
  onClose: () => void;
}

const ModalConnectionComplete = ({ address, visible, onClose }: IProps) => {
  return (
    <Modal onClose={onClose} visible={visible} width={'90%'} maskClosable={true}>
      <ModalContainer>
        <TitleText style={{ fontSize: '3rem', fontWeight: 'bold' }}>{'CONNECT\nCOMPLETED'}</TitleText>
        <Box style={{ margin: '2rem 0' }}>
          <SubText style={{ fontSize: '1.8rem' }}>Connection with wallet completed.</SubText>
          <AddressWrapper>
            <DenomIcon src='/images/denom_firma.jpg' />
            <SubText style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>
              {createTextEllipsis(address, 13, 12)}
            </SubText>
          </AddressWrapper>
        </Box>
        <ButtonWrapper>
          <Button isActive={true} onClick={onClose}>
            NEXT
          </Button>
        </ButtonWrapper>
      </ModalContainer>
    </Modal>
  );
};

export default React.memo(ModalConnectionComplete);
