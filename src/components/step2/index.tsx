import React, { useState, useEffect } from 'react';

import {
  ButtonWrapper,
  Step2Wrapper,
  NftImage,
  InputWrapper,
  Input,
  LabelText,
  InputText,
  InputArea,
  NextButton,
} from '../../styles';
import { createTextEllipsis } from '../../utils/common';
import { ModalImageCropper } from '../modal';

interface IProps {
  isActive: boolean;
  setStep: (step: number) => void;
  setLoading: (isLoading: boolean) => void;
  handleSuccessSnackbar: (message: string) => void;
  address: string;
  nftInfo: { image: { url: string; file: string }; name: string; description: string };
  setNftInfo: React.Dispatch<
    React.SetStateAction<{
      image: { url: string; file: string };
      name: string;
      description: string;
    }>
  >;
}

const Step2 = ({ isActive, setStep, setLoading, handleSuccessSnackbar, address, nftInfo, setNftInfo }: IProps) => {
  const [imageCropperModalState, setImageCropperModalState] = useState(false);
  const [isActiveNext, setActiveNext] = useState(false);

  useEffect(() => {
    if (isActive) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
          handleSuccessSnackbar(`${createTextEllipsis(address, 10, 10)} Connected`);
        }, 500);
      }, 1500);
    }
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActiveNext(nftInfo.image.url !== '' && nftInfo.name !== '' && nftInfo.description !== '');
  }, [nftInfo]);

  const onClickClose = () => {
    setImageCropperModalState(false);
  };

  const onClickNext = () => {
    if (isActiveNext) setStep(2);
  };

  const onChangeName = (e: any) => {
    setNftInfo((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const onChangeDescription = (e: any) => {
    setNftInfo((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  return (
    <Step2Wrapper>
      <ModalImageCropper visible={imageCropperModalState} onClose={onClickClose} setNftInfo={setNftInfo} />
      <NftImage src={nftInfo.image.url} />
      <NextButton
        style={{ width: '12rem', height: '4rem', lineHeight: '4rem', fontSize: '1.4rem' }}
        isActive={true}
        onClick={() => {
          setImageCropperModalState(true);
        }}
      >
        UPLOAD
      </NextButton>

      <InputWrapper>
        <Input>
          <LabelText>Name</LabelText>
          <InputText value={nftInfo.name} onChange={onChangeName} />
        </Input>
        <Input>
          <LabelText>Description</LabelText>
          <InputArea value={nftInfo.description} onChange={onChangeDescription}></InputArea>
        </Input>

        <ButtonWrapper>
          <NextButton isActive={isActiveNext} onClick={onClickNext}>
            NEXT
          </NextButton>
        </ButtonWrapper>
      </InputWrapper>
    </Step2Wrapper>
  );
};

export default React.memo(Step2);
