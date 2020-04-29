import React, { useEffect } from 'react';
import { Header, Footer } from '../../components';
import { Wrapper } from './styles';

const AboutComponent: React.FC = () => {
    useEffect(() => {
        document.title = 'Sobre | Defensor do Saints';
    }, []);

    return (
        <>
            <Header />

            <Wrapper>
                <div className="container">
                    <h2>Sobre</h2>

                    <p>
                        O portal Defensor do Saints foi criado com o intuito de
                        transmitir informações e análises sobre o New Orleans
                        Saints. Criado por Rodrigo Dias Noronha, que viu que era
                        de notável escassez a falta de conteúdo sobre a franquia
                        no Brasil, viu-se tentado a criar o site para a Who Dat
                        Nation.
                    </p>
                    <p>
                        Buscamos notícias com extrema clareza, sem
                        imparcialidade a respeito do time de New Orleans.
                    </p>
                    <p>
                        Com vagas abertas para novos redatores, basta enviar um
                        e-mail para{' '}
                        <a
                            target={'__blank'}
                            href={'mailto:rodrigonoronha09@gmail.com'}
                            type="email"
                        >
                            rodrigonoronha09@gmail.com
                        </a>
                        .
                    </p>
                </div>
            </Wrapper>

            <Footer />
        </>
    );
};

export default AboutComponent;
