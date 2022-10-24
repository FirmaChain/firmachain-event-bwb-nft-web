import React, { useState } from 'react';

import Step1 from '../components/step1';
import Step2 from '../components/step2';
import Step3 from '../components/step3';
import Step4 from '../components/step4';

import { useSnackbar } from 'notistack';
import { MainContainer, ContentsContainer } from '../styles';

interface IProps {
  setLoading: (isLoading: boolean) => void;
}

const Main = ({ setLoading }: IProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [currentStep, setStep] = useState(0);
  const [address, setAddress] = useState('');
  const [nftInfo, setNftInfo] = useState<{
    image: { url: string; file: string };
    name: string;
    description: string;
    dappNftId: string;
  }>({
    image: { url: '', file: '' },
    name: '',
    description:
      'My first ever NFT to be issued! Visit FIRMACHAIN at the BWB(Blockchain Week in Busan) 2022 event to issue your NFT. All NFTs issued by the My first NFT! service can be checked at the FIRMA NFT!',
    dappNftId: '',
  });

  const handleErrorSnackbar = (status: number) => {
    setLoading(false);
    let message = '';
    switch (status) {
      case -1:
        message = 'Connection with wallet is expired.';
        break;
      case -2:
        message = 'Connection has been rejected.';
        break;
      case -3:
        message = 'Failed to get token information';
        break;
      default:
        message = 'Connection with wallet failed.';
        break;
    }

    return enqueueSnackbar(message, {
      variant: 'error',
      autoHideDuration: 3000,
    });
  };

  const handleSuccessSnackbar = (message: string) => {
    return enqueueSnackbar(message, {
      variant: 'info',
      autoHideDuration: 1500,
    });
  };

  return (
    <>
      <MainContainer>
        <ContentsContainer currentStep={currentStep}>
          <Step1
            isActive={currentStep === 0}
            setStep={setStep}
            setLoading={setLoading}
            setAddress={setAddress}
            handleErrorSnackbar={handleErrorSnackbar}
          />
          <Step2
            isActive={currentStep === 1}
            setStep={setStep}
            setLoading={setLoading}
            handleSuccessSnackbar={handleSuccessSnackbar}
            address={address}
            nftInfo={nftInfo}
            setNftInfo={setNftInfo}
          />
          <Step3
            isActive={currentStep === 2}
            setStep={setStep}
            handleErrorSnackbar={handleErrorSnackbar}
            address={address}
            setLoading={setLoading}
            nftInfo={nftInfo}
            setNftInfo={setNftInfo}
          />
          <Step4 isActive={currentStep === 3} nftInfo={nftInfo} />
        </ContentsContainer>
      </MainContainer>
    </>
  );
};

export default React.memo(Main);
