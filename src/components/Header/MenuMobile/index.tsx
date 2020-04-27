import React, { useState } from 'react';
import { useAuth } from '../../../contexts/Auth';
import { Link } from 'react-router-dom';
import saintsLogo from '../../../assets/images/saints-gold-logo.png';
import history from '../../../services/history';
import { Form } from '@unform/web';
import Input from '../../Input';
import { Wrapper } from './styles';
import {
    FiSearch as SearchIcon,
    FiUser,
    FiCornerDownLeft,
    FiX as CloseMenuMobileIcon,
    FiMenu as MenuMobileIcon,
} from 'react-icons/fi';

interface Props {
    signed: boolean;
}

interface FormData {
    query: string;
}

const MenuMobileComponent: React.FC<Props> = ({ signed }) => {
    const [hiddenMenuMobile, setHiddenMenuMobile] = useState<boolean>(true);

    const { logOut } = useAuth();

    const handleSubmit = (data: FormData) => {
        const { query } = data;

        if (!query || !query.trim()) {
            return 0;
        }

        const param = query?.replace(/ /g, '+');
        history.push(`/search?query=${param}`);
        window.location.reload();
    };

    const logOutHandler = async () => {
        await logOut();
        history.push('/signin');
    };

    return (
        <Wrapper>
            {!hiddenMenuMobile && (
                <div className="menu-mobile" hidden={false}>
                    <div className="menu-mobile-logo-wrapper">
                        <img
                            src={saintsLogo}
                            alt="Defensor do Saints - logo"
                            title="Defensor do Saints - Logo"
                        />

                        <div
                            className="menu-mobile-clear-menu"
                            onClick={(event) =>
                                setHiddenMenuMobile(!hiddenMenuMobile)
                            }
                        >
                            <CloseMenuMobileIcon size={40} fontWeight="bold" />
                        </div>
                    </div>

                    <Form className="search-form" onSubmit={handleSubmit}>
                        <Input
                            className="search-input"
                            placeholder="Pesquisar..."
                            name="query"
                        />

                        <button type="submit" className="search-button">
                            <SearchIcon size={25} />
                        </button>
                    </Form>

                    <Link className="menu-mobile-item" to="/">
                        Home
                    </Link>

                    <Link className="menu-mobile-item" to="/posts">
                        Notícias
                    </Link>

                    <Link className="menu-mobile-item" to="/about">
                        Sobre
                    </Link>

                    <a
                        className="menu-mobile-item"
                        target={'__blank'}
                        href="https://www.twitter.com/saintsbr1967"
                    >
                        Twitter
                    </a>

                    <a
                        className="menu-mobile-item"
                        target={'__blank'}
                        href={'mailto:rodrigonoronha09@gmail.com'}
                        type="email"
                    >
                        E-mail
                    </a>

                    {signed && (
                        <>
                            <Link className="menu-mobile-item" to="/provider">
                                <FiUser color="#3f464c" size={28} />
                                Administrador
                            </Link>

                            <div
                                onClick={logOutHandler}
                                className="menu-mobile-item"
                            >
                                <FiCornerDownLeft size={28} color="#c62828" />
                                Sair
                            </div>
                        </>
                    )}
                </div>
            )}

            <button
                className="menu-mobile-button"
                onClick={(event) => setHiddenMenuMobile(!hiddenMenuMobile)}
            >
                <MenuMobileIcon size={35} />
            </button>
        </Wrapper>
    );
};

export default MenuMobileComponent;
