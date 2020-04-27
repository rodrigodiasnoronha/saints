import React, { memo, useContext } from 'react';
import AuthContext from '../../contexts/Auth';
import saintsLogo from '../../assets/images/logo.svg';
import MenuMobile from './MenuMobile';
import MenuSocialMedia from './MenuSocialMedia';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import { Space, Title, Wrapper } from './styles';

const HeaderComponent: React.FC = () => {
    const { signed } = useContext(AuthContext);

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
                <MenuSocialMedia signed={signed} />
                <Space />
            </div>
            <Navbar signed={signed} />
        </Wrapper>
    );
};

export default memo(HeaderComponent);
