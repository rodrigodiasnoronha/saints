import React from 'react';
import history from '../../services/history';
import Header from '../../components/Header';
import { Wrapper } from './styles';
import { MdSentimentDissatisfied } from 'react-icons/md';

const NotFound: React.FC = () => (
    <>
        <Header />
        <Wrapper>
            <MdSentimentDissatisfied size={150} className="text-danger" />
            <h2>
                <span className="text-danger">404</span> Not found
            </h2>
            <button
                className="btn btn-dark"
                onClick={event => history.push('/')}
            >
                Home
            </button>
        </Wrapper>
    </>
);

export default NotFound;
