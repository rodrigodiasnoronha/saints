import React from 'react';
import { Wrapper } from './styles';
import Loader from 'react-loader-spinner';

const LoaderComponent: React.FC = props => (
    <Wrapper>
        <Loader
            type="BallTriangle"
            color="#d3bc8d"
            height={100}
            width={100}
            timeout={300000} //3 secs
            {...props}
        />
    </Wrapper>
);

export default LoaderComponent;
