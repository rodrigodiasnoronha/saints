import React from 'react';
import { FiUser, FiEdit, FiFolder, FiCornerDownLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Content, Menu, Wrapper } from './styles';

const PainelComponent: React.FC = ({ children }) => {
    return (
        <Wrapper>
            <Content className="container">{children}</Content>
            <Menu>
                <Link to="/provider" className="admin-menu-item">
                    <FiFolder size={25} />
                    <h3>Posts </h3>
                </Link>

                <Link to="/provider/posts/create" className="admin-menu-item">
                    <FiEdit size={25} />
                    <h3>Create Post</h3>
                </Link>

                <Link to="/profile" className="admin-menu-item">
                    <FiUser size={25} />
                    <h3>Profile</h3>
                </Link>
                <Link to="/" className="admin-menu-item">
                    <FiCornerDownLeft size={25} />
                    <h3>Go Back</h3>
                </Link>
            </Menu>
        </Wrapper>
    );
};

export default PainelComponent;
