import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

import { LoadingWrapper } from '../../styles';

interface IProps {
  isLoading: boolean;
}

const Loading = ({ isLoading }: IProps) => {
  return (
    <LoadingWrapper active={isLoading}>
      <MutatingDots color='#0080c4' secondaryColor='#00d8ff' height={100} width={100} />
    </LoadingWrapper>
  );
};

export default React.memo(Loading);
