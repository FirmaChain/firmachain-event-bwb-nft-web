import styled from 'styled-components';
import { Metropolis } from './constants/theme';

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #1c1c24;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.8rem;
`;

export const LoadingWrapper = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000bf;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => (props.active ? `` : `display:none`)}
`;

export const TicketWrapper = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000df;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => (props.active ? `` : `display:none`)}
`;

export const ContentsContainer = styled.div<{ currentStep: number }>`
  width: 100%;
  height: 100%;
  flex: 1 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  & > div {
    display: none;
    flex: 1;
  }
  & > div:nth-child(${(props) => props.currentStep + 1}) {
    display: flex;
  }
`;

export const Logo = styled.div`
  width: 5.6rem;
  height: 5.7rem;
  background-image: url('/images/white_logo.svg');
  background-repeat: no-repeat;
  background-size: contain;
`;

export const TitleText = styled.div`
  font-family: ${Metropolis} !important;
  font-weight: bold;
  font-size: 4rem;
  text-align: center;
  letter-spacing: -0.076rem;
  white-space: pre-line;
  color: #eee;
  margin-top: 1.2rem;
`;

export const SubTitleText = styled.div`
  font-family: ${Metropolis} !important;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  letter-spacing: -0.076rem;
  white-space: pre-line;
  color: #eee;
  margin-top: 1.2rem;
`;

export const SubText = styled.div`
  font-family: ${Metropolis} !important;
  font-size: 2.2rem;
  letter-spacing: -0.04rem;
  color: #aaa;
  margin-top: 0.6rem;
  margin-bottom: 1rem;
`;

export const Button = styled.div<{ isActive: boolean }>`
  font-family: ${Metropolis} !important;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 5rem;
  min-width: 18.3rem;
  padding: 0 1rem;
  background-color: ${(props) => (props.isActive ? '#3550de' : '#44444f')};
  border-radius: 0.4rem;
  color: white;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
`;

export const SmallButton = styled.div<{ isActive: boolean }>`
  font-family: ${Metropolis} !important;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.4rem;
  min-width: 8rem;
  color: ${(props) => (props.isActive ? 'white' : '#bbb')};
  background-color: ${(props) => (props.isActive ? '#3550de' : '')};
  border: ${(props) => (props.isActive ? '' : '1px solid #bbb')};
  border-radius: 0.4rem;
  color: white;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: calc(100%);
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

const Step = styled.div`
  width: 100%;
  height: 100%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Step1Wrapper = styled(Step)``;

export const Step2Wrapper = styled(Step)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
`;

export const Step3Wrapper = styled(Step)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
`;

export const Step4Wrapper = styled(Step)`
  margin-top: -10rem;
`;

export const Step5Wrapper = styled(Step)``;

export const NftImage = styled.img`
  width: 25rem;
  height: 25rem;
  margin: 2rem;
  border: 1px solid #444;
  border-radius: 4px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`;

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 1rem;
`;

export const LabelText = styled.div`
  color: #eee;
  font-weight: 400;
  font-size: 1.6rem;
`;

export const InputText = styled.input`
  height: 4rem;
  line-height: 4rem;
  background-color: #444;
  border-radius: 4px;
  color: #aaa;
  font-size: 1.4rem;
  border: 0;
  margin: 0;
  padding: 0 1rem;
`;

export const InputTextTypo = styled.div`
  height: 4rem;
  line-height: 4rem;
  border-radius: 4px;
  color: #aaa;
  font-size: 1.4rem;
  border: 0;
  margin: 0;
`;

export const InputArea = styled.textarea`
  height: 10rem;
  line-height: 2rem;
  background-color: #444;
  border-radius: 4px;
  color: #aaa;
  font-size: 1.6rem;
  border: 0;
  margin: 0;
  padding: 1rem;
  resize: none;
`;

export const NextButton = styled.div<{ isActive: boolean }>`
  width: 100%;
  font-family: ${Metropolis} !important;
  height: 5rem;
  line-height: 5rem;
  font-weight: 600;
  font-size: 1.7rem;
  color: ${(props) => (props.isActive ? 'white' : '#bbb')};
  background-color: ${(props) => (props.isActive ? '#3550de' : '')};
  border: ${(props) => (props.isActive ? '' : '1px solid #bbb')};
  border-radius: 0.4rem;
`;

export const ConfirmButton = styled.div<{ isActive: boolean }>`
  position: fixed;
  bottom: 4rem;
  left: 2rem;
  right: 2rem;
  width: calc(100% - 4rem);
  font-family: ${Metropolis} !important;
  height: 5rem;
  line-height: 5rem;
  font-weight: 600;
  font-size: 2rem;
  color: ${(props) => (props.isActive ? 'white' : '#bbb')};
  background-color: ${(props) => (props.isActive ? '#3550de' : '')};
  border: ${(props) => (props.isActive ? '' : '1px solid #bbb')};
  border-radius: 0.4rem;
`;

export const CollectionLabel = styled.div`
  padding: 0 2rem;
  line-height: 3.4rem;
  font-size: 1.4rem;
  color: #eee;
  background-color: #00000050;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const NftImage2 = styled.img`
  width: 20rem;
  height: 20rem;
  border: 1px solid #444;
  border-radius: 4px;
  margin: 1rem 0 1rem 0;
`;

export const AppIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

export const CollectionTypo = styled.div``;

export const DescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 2rem 0;
`;

export const Description = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
`;

export const DescriptionLabel = styled.div`
  width: 16rem;
  color: #aaa;
  font-size: 1.6rem;
  line-height: 2rem;
`;

export const DescriptionTypo = styled.div`
  width: 100%;
  color: #fff;
  font-size: 1.6rem;
  line-height: 2rem;
  display: flex;
  gap: 0.5rem;
`;

export const DescriptionTypo2 = styled.div`
  width: 100%;
  color: #999;
  text-align: right;
  font-size: 1.4rem;
  line-height: 2rem;
`;

export const DescIcon = styled.img`
  height: 2rem;
`;

export const Typo = styled.div``;

export const SubTypo = styled.div`
  font-size: 1.2rem;
  color: #888;
`;

export const Divider = styled.div`
  width: calc(100%);
  height: 1px;
  background-color: #444;
`;
