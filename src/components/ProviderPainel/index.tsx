import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/Auth';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import saintsLogo from '../../assets/images/saints-gold-logo.png';
import history from '../../services/history';
import { Content, Menu, Wrapper } from './styles';
import { FaNewspaper, FaPencilAlt, FaUser } from 'react-icons/fa';

const PainelComponent: React.FC = ({ children }) => {
    const [hideMenuMobile, setHiddeMenuMobile] = useState<boolean>(true);

    const { logOut } = useContext(AuthContext);

    const handleLogOff = async () => {
        await logOut();
        history.push('/signin');
    };

    return (
        <Wrapper>
            <Menu>
                <div className="admin-header">
                    <img src={saintsLogo} alt="Saints" title="Saints" />
                    <h2>Admin Painel</h2>
                </div>

                <Link to="/provider" className="admin-menu-item">
                    <FaNewspaper size={25} />
                    <h3>Posts </h3>
                </Link>

                <Link to="/provider/posts/create" className="admin-menu-item">
                    <FaPencilAlt size={25} />
                    <h3>Create Post</h3>
                </Link>

                <Link to="/profile" className="admin-menu-item">
                    <FaUser size={25} />
                    <h3>Profile</h3>
                </Link>
                <div className="admin-menu-buttons">
                    <button
                        type="button"
                        onClick={handleLogOff}
                        className="btn btn-danger"
                    >
                        Sair
                    </button>
                    <Link to="/" className="btn btn-warning">
                        Site
                    </Link>
                </div>

                <div className="mobile">
                    <button
                        onClick={(event) => setHiddeMenuMobile(!hideMenuMobile)}
                        type="button"
                        className="mobile-button"
                    >
                        <MdMenu size={35} />
                    </button>

                    <div className="menu-mobile" hidden={hideMenuMobile}>
                        <Link to="/provider" className="menu-mobile-item">
                            <FaNewspaper size={25} />
                            <h3>Posts </h3>
                        </Link>

                        <Link
                            to="/provider/posts/create"
                            className="menu-mobile-item"
                        >
                            <FaPencilAlt size={25} />
                            <h3>Create Post</h3>
                        </Link>

                        <Link to="/profile" className="menu-mobile-item">
                            <FaUser size={25} />
                            <h3>Profile</h3>
                        </Link>

                        <button
                            type="button"
                            onClick={handleLogOff}
                            className="btn btn-danger btn-block"
                        >
                            Sair
                        </button>

                        <Link to="/" className="btn btn-warning btn-block">
                            Site
                        </Link>
                    </div>
                </div>
            </Menu>

            <Content className="container">{children}</Content>
        </Wrapper>
    );
};

export default PainelComponent;
