import React, { useState, useEffect, memo } from 'react';
import { Wrapper } from './styles';
import { Link } from 'react-router-dom';

interface Props {
    signed: boolean;
}

const NavbarComponent: React.FC<Props> = ({ signed }) => {
    const [scrollPos, setScrollPos] = useState<number>(window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll', event => {
            const newScrollPos = window.pageYOffset;
            setScrollPos(newScrollPos);
        });
    }, []);

    return (
        <Wrapper fixed={scrollPos > 50}>
            <div className="container nav-container">
                <div>
                    <Link to={'/'}> Home </Link>
                </div>
                <div>
                    <Link to={'/posts'}>Notícias</Link>
                </div>
                <div>
                    <Link to={'/about'}>Sobre</Link>
                </div>

                {signed && (
                    <div>
                        <Link to="/provider">Administrador</Link>
                    </div>
                )}
            </div>
        </Wrapper>
    );
};

export default memo(NavbarComponent);
