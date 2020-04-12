import styled from 'styled-components';

interface Props {
    fixed: boolean;
    className?: string;
}

export const Wrapper = styled.nav<Props>`
    height: 40px;
    display: flex;

    position: ${props => (props.fixed ? 'fixed' : 'initial')};
    background: ${props => (props.fixed ? '#101820' : 'transparent')};
    width: 100% !important;
    border-top: 1px solid #111111;
    opacity: 0.95;
    z-index: 5;

    @media (max-width: 606px) {
        display: none;
    }

    div.nav-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    a {
        color: var(--header-text-color);
        /* padding: 0px 5px; */
        padding: 0 1rem;
        transition: opacity 0.2s;

        :hover {
            color: var(--saints-gold-color);
        }
    }

    a:not(:hover) {
        opacity: 0.8;
    }
`;
