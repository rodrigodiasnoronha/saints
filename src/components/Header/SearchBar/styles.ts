import styled from 'styled-components';
import { Form } from '@unform/web';

export const Wrapper = styled(Form)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover,
    :focus,
    :active {
        color: var(--saints-gold-color);
    }

    @media (max-width: 606px) {
        display: none;
    }

    button {
        background: rgba(255, 255, 255, 0.1);
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 2px solid transparent;
        color: rgba(255, 255, 255, 0.4);
        line-height: 35px;
        padding: 0px 5px;
    }

    input {
        color: white;
        border: 2px solid transparent;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        background: rgba(255, 255, 255, 0.1);
        line-height: 35px;

        ::placeholder {
            color: var(--header-text-color);
        }

        :focus,
        :active {
            border: 2px solid transparent !important;
        }
    }
`;
