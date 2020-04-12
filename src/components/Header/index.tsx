import React, { useState, useEffect, memo } from 'react';
import saintsLogo from '../../assets/images/logo.svg';
import MenuMobile from '../MenuMobile';
import MenuSocialMedia from '../MenuSocialMedia';
import Navbar from '../Navbar';
import SearchBar from '../SearchBar';
import { Space, Title, Wrapper } from './styles';

const HeaderComponent: React.FC = () => {
    const [signed, setSigned] = useState<boolean>();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            setSigned(true);
        } else {
            setSigned(false);
            localStorage.removeItem('user');
            localStorage.removeItem('user_id');
        }
    }, []);

    return (
        <Wrapper>
            <div className="header-menu">
                <MenuMobile signed={signed} />
                <SearchBar />
                <Title to="/">
                    <img
                        alt="Saints logo"
                        title="Saints logo"
                        src={saintsLogo}
                    />
                    <h1>Defensor do Saints</h1>
                </Title>
                <MenuSocialMedia signed={false} />
                <Space />
            </div>
            <Navbar signed={signed} />
        </Wrapper>
    );
};

export default memo(HeaderComponent);
