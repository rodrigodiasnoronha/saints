import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
`;

export const Content = styled.div`
    height: 100%;
    padding-left: 15px;
    flex: 4;
    overflow: auto;
`;

export const Menu = styled.aside`
    display: flex;
    height: 75px;
    flex: 1;
    align-items: center;
    background-color: var(--bg-white-admin);
    box-shadow: 0px 0px 5px 4px rgba(0, 0, 0, 0.2);

    .admin-header {
        display: flex;
        flex: 1;
        align-items: center;
        padding: 10px;

        img {
            width: 70px;
        }

        h2 {
            font-size: 20px;
            font-family: 'Varela Round', Roboto, Arial, Helvetica, sans-serif;
            text-align: center;
            margin: 0px;
        }
    }

    .admin-menu-item {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--text-black);
        padding: 0px 10px;

        @media (max-width: 606px) {
            display: none;
        }

        :hover {
            color: var(--saints-gold-color);
            transition: 0.25s;
        }

        h3 {
            margin: 0px;
            margin-left: 10px;
            font-size: 18px;
        }
    }

    .admin-menu-buttons {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        button,
        a {
            margin: 10px;
        }

        @media (max-width: 606px) {
            display: none;
        }
    }

    .mobile {
        display: none;

        @media (max-width: 606px) {
            display: initial;
        }
    }

    .menu-mobile {
        z-index: 2;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 75px;
        left: 0;
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 0px 10px;

        * {
            z-index: 3;
        }

        a {
            color: var(--text-black);
        }
    }

    .mobile-button {
        border: 2px solid transparent;
        background: transparent;
    }

    .menu-mobile-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        cursor: pointer;

        :first-child {
            margin-top: 20px;
        }

        h3 {
            margin-left: 10px;
        }
    }
`;
