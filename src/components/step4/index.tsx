import React from 'react';

import {
  Step4Wrapper,
  CollectionLabel,
  NftImage2,
  AppIcon,
  CollectionTypo,
  SubTitleText,
  ConfirmButton,
} from '../../styles';

declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}

interface IProps {
  isActive: boolean;
  nftInfo: { image: { url: string; file: string }; name: string; description: string };
}

const Step4 = ({ nftInfo }: IProps) => {
  return (
    <Step4Wrapper>
      <CollectionLabel>
        <AppIcon src='/images/bwb_icon.png' />
        <CollectionTypo>My First NFT!</CollectionTypo>
      </CollectionLabel>
      <NftImage2 src={nftInfo.image.url} />
      <SubTitleText>NFT mint completed.</SubTitleText>
      <ConfirmButton isActive={true} onClick={() => window.ReactNativeWebView.postMessage('close')}>
        CONFIRM
      </ConfirmButton>
    </Step4Wrapper>
  );
};

export default React.memo(Step4);
