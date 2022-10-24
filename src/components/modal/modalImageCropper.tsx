import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Cropper from 'react-easy-crop';

import Modal from './modal';

export const ModalContainerFixed = styled.div`
  width: calc(100%);
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.8rem;
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

export const ZoomInput = styled.input`
  width: 100%;
  margin: 2rem;
`;

export const CropperContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1 100%;
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

export const ModalBottomWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000088;
`;

export const CloseMiniButton = styled.div<{ src: string }>`
  width: 2.4rem;
  height: 2.4rem;
  background-image: url('${(props) => props.src}');
`;

export const BottomTypo = styled.div`
  width: 75%;
  text-align: center;
  font-size: 2rem;
`;

interface IProps {
  imageSrc: string;
  setImageSrc: (src: string | null) => void;
  setNftInfo: React.Dispatch<
    React.SetStateAction<{
      image: { url: string; file: string };
      name: string;
      description: string;
      dappNftId: string;
    }>
  >;
}

const ModalImageCropper = ({ imageSrc, setImageSrc, setNftInfo }: IProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onClose = () => {
    setImageSrc(null);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

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
    <Modal onClose={onClose} transparent={true} visible={imageSrc !== null} width={'100%'} maskClosable={true}>
      <ModalContainerFixed>
        <CropperContainer>
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
        </CropperContainer>
      </ModalContainerFixed>
      <ModalBottomWrapper>
        <CloseMiniButton src='/images/ic_close_24px.png' onClick={() => onClose()} />
        <BottomTypo>Image Crop</BottomTypo>
        <CloseMiniButton src='/images/ic_check_bl_24px.png' onClick={() => cropped()} />
      </ModalBottomWrapper>
    </Modal>
  );
};

export default React.memo(ModalImageCropper);
