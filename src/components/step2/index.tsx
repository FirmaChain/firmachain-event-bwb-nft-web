import React, { useState, useEffect, useRef } from 'react';

import {
  ButtonWrapper,
  Step2Wrapper,
  NftImageWrapper,
  ResetButton,
  NftImage,
  NftImageButton,
  InputWrapper,
  Input,
  LabelText,
  InputText,
  InputArea,
  NextButton,
  ImageInput,
  InputLength,
  CurrnetLength,
  StepBar,
} from '../../styles';
import { createTextEllipsis } from '../../utils/common';
import { ModalImageCropper } from '../modal';

interface IProps {
  isActive: boolean;
  setStep: (step: number) => void;
  setLoading: (isLoading: boolean) => void;
  handleSuccessSnackbar: (message: string) => void;
  address: string;
  nftInfo: { image: { url: string; file: string }; name: string; description: string; dappNftId: string };
  setNftInfo: React.Dispatch<
    React.SetStateAction<{
      image: { url: string; file: string };
      name: string;
      description: string;
      dappNftId: string;
    }>
  >;
}

const Step2 = ({ isActive, setStep, setLoading, handleSuccessSnackbar, address, nftInfo, setNftInfo }: IProps) => {
  const [isActiveNext, setActiveNext] = useState(false);
  const [imageSrc, setImageSrc] = React.useState<any>(null);
  const imageInputRef = useRef<any>(null);

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

  const onClickResetImage = (e: any) => {
    setNftInfo((prevState) => ({
      ...prevState,
      image: { url: '', file: '' },
    }));
  };

  const readFile = async (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const onClickImageInput = () => {
    imageInputRef.current.click();
  };

  return (
    <Step2Wrapper>
      <ModalImageCropper setImageSrc={setImageSrc} imageSrc={imageSrc} setNftInfo={setNftInfo} />
      <ImageInput ref={imageInputRef} type={'file'} onChange={onFileChange} accept='image/*' />
      <StepBar src='/images/img_step_2.png' />
      {nftInfo.image.url ? (
        <NftImageWrapper>
          <NftImage src={nftInfo.image.url} />
          <ResetButton onClick={onClickResetImage} />
        </NftImageWrapper>
      ) : (
        <NftImageButton onClick={onClickImageInput} />
      )}

      <InputWrapper>
        <Input>
          <InputLength>
            <CurrnetLength isActive={nftInfo.name.length > 0}>{nftInfo.name.length}</CurrnetLength>/200
          </InputLength>
          <LabelText>Name</LabelText>
          <InputText value={nftInfo.name} onChange={onChangeName} maxLength={200} placeholder='Enter the NFT name' />
        </Input>
        <Input>
          <LabelText>Description</LabelText>
          <InputArea value={nftInfo.description} onChange={onChangeDescription}></InputArea>
        </Input>

        <ButtonWrapper>
          <NextButton isActive={isActiveNext} onClick={onClickNext}>
            Next
          </NextButton>
        </ButtonWrapper>
      </InputWrapper>
    </Step2Wrapper>
  );
};

export default React.memo(Step2);
