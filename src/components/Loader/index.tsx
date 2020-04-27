import React from 'react';
import { Wrapper } from './styles';
import { RotateSpinner } from 'react-spinners-kit';

const LoaderComponent: React.FC = (props) => (
    <Wrapper>
        <RotateSpinner size={80} color="#d3bc8d" loading={true} />;
    </Wrapper>
);

export default LoaderComponent;
