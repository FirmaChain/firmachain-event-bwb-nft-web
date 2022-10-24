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
  width: 101vw;
  height: 101vh;
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

export const Logo = styled.img`
  width: 27.4rem;
  height: 21.5rem;
  margin-bottom: 4rem;
  @media only screen and (max-width: 300px) {
    width: calc(100% - 4rem);
    height: auto;
  }
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

export const FixedButtonWrapper = styled.div`
  position: absolute;
  padding: 2rem;
  bottom: 1rem;
  display: flex;
  width: calc(100% - 4rem);
  gap: 2rem;
  align-items: center;
  justify-content: center;
  background-color: white;
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

export const Step1Wrapper = styled(Step)`
  background-image: url('/images/img_background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
`;

export const Step2Wrapper = styled(Step)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Step3Wrapper = styled(Step)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Step4Wrapper = styled(Step)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Step5Wrapper = styled(Step)``;

export const NftImageWrapper = styled.div`
  position: relative;
  width: 18rem;
  height: 18rem;
  margin: 2rem;
`;

export const ResetButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  background-image: url('/images/ic_close_round.png');
  background-repeat: no-repeat;
  background-position: center center;
`;

export const NftImageButton = styled.div`
  width: 18rem;
  height: 18rem;
  margin: 2rem;
  border: dashed 2px #b5b5b5;
  border-radius: 1rem;
  background-color: #f4f4f4;
  background-image: url('/images/ic_plus_gy_32px.png');
  background-size: 3.2rem;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const NftImage = styled.img`
  width: 18rem;
  height: 18rem;
  border-radius: 1rem;
`;

export const InputWrapper = styled.div`
  width: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 3rem 2rem 0 2rem;
`;

export const Input = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  text-align: left;
  gap: 1rem;
`;

export const LabelText = styled.div`
  color: #eee;
  font-weight: 400;
  font-size: 1.6rem;
  color: #707070;
`;

export const InputText = styled.input`
  height: 4rem;
  line-height: 4rem;
  border-radius: 4px;
  color: #1c1c24;
  font-size: 1.6rem;
  border: 1px solid #dddddd;
  margin: 0;
  padding: 0 1rem;
  &::placeholder {
    color: #ccc;
  }
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
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #aaa;
  font-size: 1.6rem;
  margin: 0;
  padding: 1rem;
  resize: none;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: #eee;
  }

  ::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-corner,
  ::-webkit-resizer {
    background: #eee;
  }
`;

export const NextButton = styled.div<{ isActive: boolean }>`
  width: 100%;
  font-family: ${Metropolis} !important;
  height: 5rem;
  line-height: 5rem;
  font-size: 1.7rem;
  color: ${(props) => (props.isActive ? 'white' : '#999999')};
  background-color: ${(props) => (props.isActive ? '#316ff5' : '#dddddd')};
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
  width: 18rem;
  height: 18rem;
  border-radius: 1rem;
  margin: 2rem 0 5rem 0;
`;

export const NftImage3 = styled.img`
  width: 24rem;
  height: 24rem;
  border-radius: 1rem;
  margin: 2.4rem;
`;

export const AppIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

export const CollectionTypo = styled.div``;

export const DescriptionWrapper = styled.div`
  width: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media only screen and (max-width: 300px) {
    width: calc(100% - 10rem);
  }
`;

export const DescriptionWrapperMin = styled.div`
  width: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media only screen and (max-width: 300px) {
    width: calc(100% - 10rem);
  }
`;

export const Description = styled.div`
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DescriptionRow = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
`;

export const DescriptionLabel = styled.div`
  width: 16rem;
  color: #707070;
  font-size: 1.6rem;
  line-height: 2rem;
  margin-bottom: 0.5rem;
`;

export const DescriptionTypo = styled.div`
  width: 100%;
  color: #1c1c24;
  font-size: 1.6rem;
  line-height: 2rem;
  display: flex;
  gap: 0.5rem;
`;

export const DescriptionTypoOpener = styled.div<{ isOpen: boolean }>`
  width: 100%;
  ${(props) =>
    props.isOpen
      ? ``
      : `white-space: normal;
      display: -webkit-box;
      overflow: hidden;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;`}

  color: #1c1c24;
  font-size: 1.6rem;
  line-height: 2rem;
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
  border-radius: 1rem;
`;

export const Typo = styled.div`
  color: #707070;
  font-size: 1.4rem;
`;

export const SubTypo = styled.div`
  font-size: 1.3rem;
  color: #707070;
`;

export const Divider = styled.div`
  width: calc(100% - 4rem);
  height: 1px;
  margin: 2.4rem 0;
  background-color: #dddddd;
`;

export const ImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  display: none;
`;

export const InputLength = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.4rem;
  color: #999999;
`;

export const CurrnetLength = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? '#316ff5' : '999999')};
`;

export const StepBar = styled.img``;

export const ScrollWrapper = styled.div`
  position: relative;
  height: calc(100% - 30rem - 9rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
  min-height: min-content;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ArrowButton = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: -1rem;
  right: -1rem;
  width: 1.6rem;
  height: 1.6rem;
  background-image: url('${(props) => (props.isOpen ? '/images/ic_arrow_up.png' : '/images/ic_arrow_down.png')}');
  background-size: 1.6rem;
  background-repeat: no-repeat;
  background-position: center center;
  padding: 1rem;
`;

export const CompleteTypo = styled.div`
  font-family: ${Metropolis} !important;
  width: 19.4rem;
  height: 6rem;
  margin-top: 3.3rem;
  font-size: 3rem;
  color: #316ff5;
  font-weight: bold;
`;

export const NftNameTypo = styled.div`
  color: #1c1c24;
  font-size: 2rem;
  margin: 0 0 2rem 0;
  font-weight: bold;
`;

export const DivierDashed = styled.div`
  width: 24rem;
  height: 0;
  border-bottom: 1px dashed #dddddd;
  margin-bottom: 1.5rem;
`;

export const GuideTypo = styled.div`
  color: #999999;
  position: absolute;
  bottom: 5rem;
  font-size: 1.4rem;
`;

export const Step4DescriptionWrapperMin = styled.div`
  width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Step4DescriptionRow = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
`;

export const Step4DescriptionLabel = styled.div`
  width: 16rem;
  color: #707070;
  font-size: 1.6rem;
  line-height: 2rem;
  margin-bottom: 0.5rem;
`;

export const Step4DescriptionTypo = styled.div`
  width: 100%;
  color: #1c1c24;
  font-size: 1.6rem;
  line-height: 2rem;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;
