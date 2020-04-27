import styled from 'styled-components';

export const Wrapper = styled.aside`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        border: 2px solid transparent;
        padding: 5px;
        margin: 0px 5px;
        border-radius: 50%;
        color: var(--saints-gold-color);

        :hover {
            border: 2px solid var(--twitter-color);
            transition: 1s;
            color: var(--saints-gold-color);
        }

        :active,
        :visited {
            color: var(--saints-gold-color);
        }
    }

    @media (max-width: 606px) {
        display: none;
    }
`;
