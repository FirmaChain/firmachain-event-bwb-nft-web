import React, { useState } from 'react';
import axios from 'axios';

import { useInterval } from '../../utils/interval';
import { Logo, TitleText, SubText, ButtonWrapper, Button, Step1Wrapper } from '../../styles';

interface IProps {
  isActive: boolean;
  setStep: (step: number) => void;
  setLoading: (isLoading: boolean) => void;
  setAddress: (address: string) => void;
  handleErrorSnackbar: (status: number) => void;
}

const Step1 = ({ isActive, setStep, setLoading, setAddress, handleErrorSnackbar }: IProps) => {
  const [requestKey, setRequestKey] = useState('');
  const [isTickerActive, setIsTickerActive] = useState(false);

  useInterval(() => timerTick(), isActive && isTickerActive ? 1000 : null);

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
            setIsTickerActive(false);
            setAddress(result.signer);
            setLoading(false);
            setStep(1);
          } else if (result.status < 0) {
            setIsTickerActive(false);
            handleErrorSnackbar(result.status);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsTickerActive(false);
          handleErrorSnackbar(0);
        });
    }
  };

  const onClickConnect = () => {
    setLoading(true);
    setRequestKey('');
    axios
      .post(`${process.env.REACT_APP_API_HOST}/nft/sign/login`)
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

        handleErrorSnackbar(0);
        setIsTickerActive(false);
      });
  };

  return (
    <Step1Wrapper>
      <Logo />
      <TitleText>My First NFT!</TitleText>
      <SubText style={{ marginTop: '1.4rem' }}>BWB 2022</SubText>
      <ButtonWrapper>
        <Button style={{ borderRadius: '0.4rem' }} isActive={true} onClick={onClickConnect}>
          CONNECT
        </Button>
      </ButtonWrapper>
    </Step1Wrapper>
  );
};

export default React.memo(Step1);
