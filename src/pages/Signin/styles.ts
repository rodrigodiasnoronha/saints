import styled from 'styled-components';
import { Form as FormUnform } from '@unform/web';

export const Form = styled(FormUnform)`
    background-color: var(--bg-white);
    padding: 30px 25px;
    border-radius: 5px;
    max-width: 450px;
    width: 100%;
    display: flex;
    flex-direction: column;

    @media (max-width: 606px) {
        padding: 30px 10px;
    }

    legend {
        text-align: center;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        margin-top: 5px;
    }

    .input-group label {
        margin-bottom: 2px;
        padding-left: 5px;
        font-weight: 600;
        font-size: 18px;
        color: var(--text-gray);
    }

    button {
        margin: 15px 0px;
        line-height: 35px;
        border: 2px solid var(--bg-black);
        border-radius: 5px;
        text-transform: uppercase;
        background-color: var(--bg-black);
        color: var(--text-white);

        :hover,
        :active {
            transition: 0.25s;
            background-color: var(--saints-gold-color);
            border-color: var(--saints-gold-color);
            color: var(--text-black);
        }
    }

    .forgot-pass {
        color: var(--text-black);
        cursor: pointer;
        text-align: center;
        font-size: 14px;

        :hover {
            color: #868e96;
            transition: 0.25s;
        }
    }
`;
