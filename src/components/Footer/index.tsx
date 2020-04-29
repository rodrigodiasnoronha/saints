import React, { memo } from 'react';
import { FiUser, FiAtSign, FiTwitter } from 'react-icons/fi';
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
                onClick={() => history.push('/')}
            />
        </div>

        <div className="content">
            <div className="about" style={{ color: '#444' }}>
                Copyright &copy; 2019 - Defensor do Saints
            </div>

            <div className="social-network-wrapper">
                <div className="social-network">
                    <a
                        target={'__blank'}
                        href="https://www.twitter.com/saintsbr1967"
                    >
                        <FiTwitter color={'#444'} size={20} /> Twitter
                    </a>
                </div>
                <div className="social-network">
                    <a
                        target={'__blank'}
                        href={'mailto:rodrigonoronha09@gmail.com'}
                        type="email"
                    >
                        <FiAtSign color={'#444'} size={20} /> E-mail
                    </a>
                </div>

                <div
                    className="social-network"
                    onClick={() => history.push(`/signin`)}
                >
                    <FiUser color={'#444'} size={20} /> Admin
                </div>
            </div>
        </div>
    </Wrapper>
);

export default memo(FooterComponent);
