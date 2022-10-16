import React, { useMemo, useState } from 'react';
import axios from 'axios';

import {
  ButtonWrapper,
  Step3Wrapper,
  CollectionLabel,
  NftImage2,
  AppIcon,
  CollectionTypo,
  DescriptionWrapper,
  Description,
  DescriptionLabel,
  DescriptionTypo,
  DescriptionTypo2,
  DescIcon,
  Typo,
  SubTypo,
  Divider,
  NextButton,
} from '../../styles';
import { useInterval } from '../../utils/interval';
import { createTextEllipsis } from '../../utils/common';

interface IProps {
  isActive: boolean;
  address: string;
  setStep: (step: number) => void;
  setLoading: (isLoading: boolean) => void;
  handleErrorSnackbar: (status: number) => void;
  nftInfo: { image: { url: string; file: string }; name: string; description: string };
}

const Step3 = ({ isActive, address, setStep, setLoading, handleErrorSnackbar, nftInfo }: IProps) => {
  const [requestKey, setRequestKey] = useState('');
  const [isTickerActive, setIsTickerActive] = useState(false);

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
          console.log(result);
          if (result.status === 1) {
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
      <CollectionLabel>
        <AppIcon src='/images/bwb_icon.png' />
        <CollectionTypo>My First NFT!</CollectionTypo>
      </CollectionLabel>
      <NftImage2 src={nftInfo.image.url} />
      <DescriptionWrapper>
        <Description>
          <DescriptionLabel>Name</DescriptionLabel>
          <DescriptionTypo>{nftInfo.name}</DescriptionTypo>
        </Description>
        <Description>
          <DescriptionLabel>Description</DescriptionLabel>
          <DescriptionTypo>{nftInfo.description}</DescriptionTypo>
        </Description>
      </DescriptionWrapper>
      <Divider />
      <DescriptionWrapper>
        <Description>
          <DescriptionLabel>Chain</DescriptionLabel>
          <DescriptionTypo>
            <DescIcon src='/images/bwb_icon.png' />
            <Typo>FIRMACHAIN</Typo>
            <SubTypo>(colosseum-1)</SubTypo>
          </DescriptionTypo>
        </Description>
        <Description>
          <DescriptionLabel>Collection</DescriptionLabel>
          <DescriptionTypo>
            <DescIcon src='/images/bwb_icon.png' />
            <Typo>My First NFT!</Typo>
          </DescriptionTypo>
        </Description>
        <Description>
          <DescriptionLabel>Created By</DescriptionLabel>
          <DescriptionTypo>
            <DescIcon src='/images/bwb_icon.png' />
            <Typo> {createTextEllipsis(address, 10, 10)}</Typo>
          </DescriptionTypo>
        </Description>
      </DescriptionWrapper>
      <Divider />
      <DescriptionWrapper>
        <Description>
          <DescriptionLabel>Fee</DescriptionLabel>
          <DescriptionTypo2>0.02 FCT</DescriptionTypo2>
        </Description>
      </DescriptionWrapper>
      <ButtonWrapper>
        <NextButton isActive={false}>CANCEL</NextButton>
        <NextButton isActive={true} onClick={() => onClickMint()}>
          MINT
        </NextButton>
      </ButtonWrapper>
    </Step3Wrapper>
  );
};

export default React.memo(Step3);
