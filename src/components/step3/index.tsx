import React, { useMemo, useState, useRef } from 'react';
import axios from 'axios';

import { useScrollWithShadow } from './hook';
import { useInterval } from '../../utils/interval';
import { createTextEllipsis } from '../../utils/common';

import {
  FixedButtonWrapper,
  Step3Wrapper,
  StepBar,
  NftImage2,
  DescriptionWrapper,
  DescriptionWrapperMin,
  Description,
  DescriptionRow,
  DescriptionLabel,
  DescriptionTypo,
  DescriptionTypoOpener,
  ScrollWrapper,
  DescIcon,
  Typo,
  SubTypo,
  Divider,
  NextButton,
  TopWrapper,
  ArrowButton,
} from '../../styles';

interface IProps {
  isActive: boolean;
  address: string;
  setStep: (step: number) => void;
  setLoading: (isLoading: boolean) => void;
  handleErrorSnackbar: (status: number) => void;
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

const Step3 = ({ isActive, address, setStep, setLoading, handleErrorSnackbar, nftInfo, setNftInfo }: IProps) => {
  const [requestKey, setRequestKey] = useState('');
  const [isTickerActive, setIsTickerActive] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const scrollWrapperRef = useRef<any>(null);

  const { boxShadow, onScrollHandler } = useScrollWithShadow({ isOpen });

  useInterval(() => timerTick(), isActive && isTickerActive ? 1000 : null);

  const walletAddress = useMemo(() => {
    return address;
  }, [address]);

  const getRequestStatus = async (requestKey: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/nft/requests/${requestKey}`);

      if (response.data.code !== 0) {
        throw new Error('INVALID REQUEST');
      }
      return response.data.result;
    } catch (error) {
      throw error;
    }
  };

  const timerTick = () => {
    if (requestKey !== '') {
      getRequestStatus(requestKey)
        .then((result) => {
          if (result.status === 1) {
            setNftInfo((prevState) => ({
              ...prevState,
              dappNftId: result.extra,
            }));
            setIsTickerActive(false);
            setLoading(false);
            setStep(3);
          } else if (result.status < 0) {
            setIsTickerActive(false);
            handleErrorSnackbar(result.status);
          }
        })
        .catch((error) => {
          setIsTickerActive(false);
          handleErrorSnackbar(0);
          console.log(error);
        });
    }
  };

  const onClickMint = () => {
    setLoading(true);
    setRequestKey('');

    axios
      .post(`${process.env.REACT_APP_API_HOST}/nft/sign/mint`, {
        signer: walletAddress,
        nftImage: nftInfo.image.file,
        nftName: nftInfo.name,
        nftDescription: nftInfo.description,
      })
      .then((response) => {
        if (response.data.code !== 0) {
          throw new Error('INVALID REQUEST');
        }
        const url = response.data.result.qrcode;
        window.location.href = url;
        console.log(response.data.result.qrcode);
        setIsTickerActive(true);
        setRequestKey(response.data.result.requestKey);
      })
      .catch((error) => {
        console.log(error);
        setIsTickerActive(false);
        handleErrorSnackbar(0);
      });
  };

  return (
    <Step3Wrapper>
      <TopWrapper>
        <StepBar src='/images/img_step_3.png' />
        <NftImage2 src={nftInfo.image.url} />
      </TopWrapper>
      <ScrollWrapper ref={scrollWrapperRef} onScroll={onScrollHandler} style={{ boxShadow }}>
        <DescriptionWrapper>
          <Description>
            <DescriptionLabel>Name</DescriptionLabel>
            <DescriptionTypo>{nftInfo.name}</DescriptionTypo>
          </Description>
          <Description>
            <ArrowButton isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
            <DescriptionLabel>Description</DescriptionLabel>
            <DescriptionTypoOpener isOpen={isOpen}>{nftInfo.description}</DescriptionTypoOpener>
          </Description>
        </DescriptionWrapper>
        <Divider />
        <DescriptionWrapperMin>
          <DescriptionRow>
            <DescriptionLabel>Blockchain</DescriptionLabel>
            <DescriptionTypo style={{ justifyContent: 'flex-end' }}>
              <DescIcon src='/images/denom_firma.jpg' />
              <Typo>FIRMACHAIN</Typo>
              <SubTypo>(colosseum-1)</SubTypo>
            </DescriptionTypo>
          </DescriptionRow>
          <DescriptionRow>
            <DescriptionLabel>Collection</DescriptionLabel>
            <DescriptionTypo style={{ justifyContent: 'flex-end' }}>
              <DescIcon src='/images/myfirstnft.png' />
              <Typo>My First NFT!</Typo>
            </DescriptionTypo>
          </DescriptionRow>
          <DescriptionRow>
            <DescriptionLabel>Created By</DescriptionLabel>
            <DescriptionTypo style={{ justifyContent: 'flex-end' }}>
              <DescIcon src='/images/ic_profile.png' style={{ filter: 'brightness(65%) grayscale(100%)' }} />
              <Typo> {createTextEllipsis(address, 10, 10)}</Typo>
            </DescriptionTypo>
          </DescriptionRow>
        </DescriptionWrapperMin>
      </ScrollWrapper>
      <FixedButtonWrapper>
        <NextButton isActive={false}>Cancel</NextButton>
        <NextButton isActive={true} onClick={() => onClickMint()}>
          Mint
        </NextButton>
      </FixedButtonWrapper>
    </Step3Wrapper>
  );
};

export default React.memo(Step3);
