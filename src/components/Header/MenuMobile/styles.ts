import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;

    @media (min-width: 606px) {
        display: none;
    }

    .menu-mobile {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background-color: var(--header-bg);
        display: flex;
        flex-direction: column;
        z-index: 10;
        @media (min-width: 606px) {
            display: none;
        }
    }

    .menu-mobile-button {
        background: transparent;
        border: 2px solid transparent;
        color: var(--saints-gold-color);
        flex: 1;

        @media (max-width: 606px) {
            display: initial;
        }
    }

    .menu-mobile-logo-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .menu-mobile-logo-wrapper img {
        height: 50px;
    }

    .menu-mobile-clear-menu {
        background: transparent;
        color: var(--saints-gold-color);
        border: 2px solid transparent;
        cursor: pointer;

        :focus,
        :active,
        :hover {
            opacity: 0.5;
            transition: 0.5s;
        }
    }

    .search-form {
        margin: 5px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
    }

    .search-input {
        flex: 1;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
        background: transparent;
        border: 2px solid transparent;
        border-radius: 4px;
        padding-left: 5px;
    }
    .search-button {
        background: transparent;
        border: 2px solid transparent;
        color: rgba(255, 255, 255, 0.5);
        padding-right: 5px;
    }
    .menu-mobile-auth {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 5px 0px;
        border-bottom: 2px solid #111111;
    }
    .menu-mobile-item {
        display: flex;
        align-items: center;

        padding: 8px;
        padding-left: 15px;
        font-size: 16px;
        font-weight: bold;

        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: #ccc;

        :hover,
        :active,
        :focus {
            * {
                color: var(--saints-gold-color);
                transition: 0.25s;
            }
        }
    }

    .menu-mobile-item svg {
        margin-right: 8px;
    }
`;
