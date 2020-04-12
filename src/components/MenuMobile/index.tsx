import React, { useState } from 'react';
import firebase from '../../services/firebase';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import saintsLogo from '../../assets/images/saints-gold-logo.png';
import history from '../../services/history';
import { Form } from '@unform/web';
import Input from '../Input';
import { Wrapper } from './styles';
import {
    MdMenu as MenuMobileIcon,
    MdClear as CloseMenuMobileIcon,
    MdPerson,
    MdSubdirectoryArrowLeft
} from 'react-icons/md';

interface Props {
    signed: boolean;
}

interface FormData {
    query: string;
}

const MenuMobileComponent: React.FC<Props> = ({ signed }) => {
    const [hiddenMenuMobile, setHiddenMenuMobile] = useState<boolean>(true);

    const handleSubmit = (data: FormData) => {
        const { query } = data;

        if (!query || !query.trim()) {
            return 0;
        }

        const param = query?.replace(/ /g, '+');
        history.push(`/search?query=${param}`);
        window.location.reload();
    };

    const logOut = async () => {
        await firebase.auth().signOut();
        localStorage.removeItem('user_id');
        localStorage.removeItem('user');
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
                            onClick={event =>
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
                                <MdPerson color="#3f464c" size={28} />
                                Administrador
                            </Link>

                            <div onClick={logOut} className="menu-mobile-item">
                                <MdSubdirectoryArrowLeft
                                    size={28}
                                    color="#c62828"
                                />
                                Sair
                            </div>
                        </>
                    )}
                </div>
            )}

            <button
                className="menu-mobile-button"
                onClick={event => setHiddenMenuMobile(!hiddenMenuMobile)}
            >
                <MenuMobileIcon size={35} />
            </button>
        </Wrapper>
    );
};

export default MenuMobileComponent;
