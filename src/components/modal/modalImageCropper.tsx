import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Cropper from 'react-easy-crop';

import Modal from './modal';

import { SmallButton } from '../../styles';

export const ModalContainerFixed = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.8rem;
  gap: 2rem;
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`;

export const ModalTitle = styled.div`
  flex: 1 3.5rem;
  font-weight: bold;
  font-size: 3rem;
  text-align: center;
  color: #eee;
`;

export const ImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  display: none;
`;

export const ZoomInput = styled.input`
  width: 100%;
  margin: 2rem;
`;

export const CropperContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1 100%;
  border: 1px solid #777;
  border-radius: 4px;
`;

export const ChooseImageInput = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  gap: 1rem;
`;

export const ChooseTypo = styled.div``;

export const ChooseIcon = styled.img`
  width: 3rem;
  height: 3rem;
  filter: brightness(0) invert(1);
`;

export const SmallButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1.5rem;
`;

interface IProps {
  visible: boolean;
  onClose: () => void;
  setNftInfo: React.Dispatch<
    React.SetStateAction<{
      image: { url: string; file: string };
      name: string;
      description: string;
    }>
  >;
}

const ModalImageCropper = ({ visible, onClose, setNftInfo }: IProps) => {
  const [imageSrc, setImageSrc] = React.useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const imageInputRef = useRef<any>(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const readFile = async (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onClickImageInput = () => {
    imageInputRef.current.click();
  };

  const cropped = () => {
    getCroppedImg(imageSrc, croppedAreaPixels)
      .then((result: { url: string; file: any }) => {
        setNftInfo((prevState) => ({
          ...prevState,
          image: result,
        }));
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createImage = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });
  };

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: any,
    flip = { horizontal: false, vertical: false }
  ): Promise<{ url: string; file: any }> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return { url: '', file: null };
    }

    const bBoxWidth = image.width;
    const bBoxHeight = image.height;

    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(data, 0, 0);

    // As Base64 string
    // return canvas.toDataURL('image/jpeg');

    return new Promise((resolve, reject) => {
      canvas.toBlob((file: any) => {
        resolve({
          url: URL.createObjectURL(file),
          file: canvas.toDataURL('image/jpeg'),
        });

        // const reader = new FileReader();
        // reader.addEventListener('loadend', () => {
        //   const arrayBuffer: any = reader.result;

        //   const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

        //   resolve({
        //     url: URL.createObjectURL(file),
        //     file: blob,
        //     // file: canvas.toDataURL('image/jpeg'),
        //   });
        // });
        // reader.readAsArrayBuffer(file);
      }, 'image/jpeg');
    });
  };

  return (
    <Modal onClose={onClose} visible={visible} width={'100%'} maskClosable={true} transparent={true}>
      <ModalContainerFixed>
        <ModalTitle>Image Upload</ModalTitle>
        <ImageInput ref={imageInputRef} type={'file'} onChange={onFileChange} accept='image/*' />
        <CropperContainer>
          {imageSrc === null && (
            <ChooseImageInput onClick={onClickImageInput}>
              <ChooseIcon src='/images/upload.png' />
              <ChooseTypo>Choose Nft Image</ChooseTypo>
            </ChooseImageInput>
          )}
          {imageSrc !== null && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              restrictPosition={true}
              objectFit='horizontal-cover'
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          )}
        </CropperContainer>

        <SmallButtonWrapper>
          <SmallButton isActive={false} onClick={() => onClose()}>
            CLOSE
          </SmallButton>
          <SmallButton isActive={false} onClick={() => setImageSrc(null)}>
            RESET
          </SmallButton>
          <SmallButton isActive={true} onClick={() => cropped()}>
            OK
          </SmallButton>
        </SmallButtonWrapper>
      </ModalContainerFixed>
    </Modal>
  );
};

export default React.memo(ModalImageCropper);
