import React, { memo } from 'react';
import { FaRegCopyright, FaTwitter, FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import goldLogoSaints from '../../assets/images/logo.svg';
import history from '../../services/history';
import { Wrapper } from './styles';

const FooterComponent: React.FC = () => (
    <Wrapper>
        <div className="logo-wrapper">
            <img
                src={goldLogoSaints}
                alt="Saints logo"
                title="Saints logo"
                onClick={event => history.push('/')}
            />
        </div>

        <div className="content">
            <div className="about" style={{ color: '#444' }}>
                Copyright <FaRegCopyright size={20} color={'#444'} /> 2019 -
                Defensor do Saints
            </div>

            <div className="social-network-wrapper">
                <div className="social-network">
                    <a
                        target={'__blank'}
                        href="https://www.twitter.com/saintsbr1967"
                    >
                        <FaTwitter color={'#444'} size={20} /> Twitter
                    </a>
                </div>
                <div className="social-network">
                    <a
                        target={'__blank'}
                        href={'mailto:rodrigonoronha09@gmail.com'}
                        type="email"
                    >
                        <MdEmail color={'#444'} size={20} /> E-mail
                    </a>
                </div>

                <div
                    className="social-network"
                    onClick={event => history.push(`/signin`)}
                >
                    <FaUserAlt color={'#444'} size={20} /> Admin
                </div>
            </div>
        </div>
    </Wrapper>
);

export default memo(FooterComponent);
