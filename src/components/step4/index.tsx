import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {
  Step4Wrapper,
  NftImage3,
  StepBar,
  CompleteTypo,
  NftNameTypo,
  DivierDashed,
  DescIcon,
  Typo,
  GuideTypo,
  Step4DescriptionWrapperMin,
  Step4DescriptionRow,
  Step4DescriptionLabel,
  Step4DescriptionTypo,
} from '../../styles';

declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}

interface IProps {
  isActive: boolean;
  nftInfo: { image: { url: string; file: string }; name: string; description: string; dappNftId: string };
}

const Step4 = ({ isActive, nftInfo }: IProps) => {
  const [nftId, setNftId] = useState('');

  useEffect(() => {
    if (isActive) {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/nft/${nftInfo.dappNftId}`)
        .then((response) => {
          setNftId(response.data.nftId);
        })
        .catch((error) => {});

      setTimeout(() => {
        window.ReactNativeWebView.postMessage('close');
      }, 5000);
    }
  }, [isActive]);

  return (
    <Step4Wrapper>
      <StepBar src='/images/img_step_4.png' />
      <CompleteTypo>NFT MINT COMPLETED!</CompleteTypo>
      <NftImage3 src={nftInfo.image.url} />
      <NftNameTypo>{nftInfo.name}</NftNameTypo>
      <DivierDashed />
      <Step4DescriptionWrapperMin>
        <Step4DescriptionRow>
          <Step4DescriptionLabel>No.</Step4DescriptionLabel>
          <Step4DescriptionTypo>#{nftId}</Step4DescriptionTypo>
        </Step4DescriptionRow>
        <Step4DescriptionRow>
          <Step4DescriptionLabel>Collection</Step4DescriptionLabel>
          <Step4DescriptionTypo>
            <DescIcon src='/images/myfirstnft.png' />
            <Typo>My First NFT!</Typo>
          </Step4DescriptionTypo>
        </Step4DescriptionRow>
      </Step4DescriptionWrapperMin>
      <GuideTypo>*Go to Dapp screen after 5 seconds.</GuideTypo>
    </Step4Wrapper>
  );
};

export default React.memo(Step4);
