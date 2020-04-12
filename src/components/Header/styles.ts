import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Wrapper = styled.header`
    display: flex;
    flex-direction: column;
    background: var(--header-bg);
    color: var(--header-text-color);

    .header-menu {
        display: flex;
        padding: 5px;
    }
`;

export const Title = styled(Link)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 606px) {
        flex: 10; /** Direção do icone do menu  */
    }

    img {
        height: 50px;
    }

    h1 {
        color: var(--header-text-color) !important;
        font-family: Roboto Mono, Roboto, Arial, Helvetica, sans-serif;
        font-weight: normal;
        font-size: 20px;
        margin: 0px;
        padding: 0px;

        @media (max-width: 815px) {
            display: none;
        }
    }
`;

export const Space = styled.div`
    display: none;

    @media (max-width: 606px) {
        display: initial;
        flex: 2;
    }
`;
