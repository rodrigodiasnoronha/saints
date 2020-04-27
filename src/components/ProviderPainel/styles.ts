import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
`;

export const Content = styled.div`
    height: 100%;
    padding-left: 15px;
    flex: 4;
    overflow: auto;
    padding-bottom: 50px;
`;

export const Menu = styled.aside`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;

    flex: 1;
    background-color: var(--saints-black-color);
    color: #fff;
    box-shadow: 0px 0px 5px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;

    @media (max-width: 606px) {
        justify-content: space-around;
    }

    .admin-menu-item {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--text-white);
        padding: 0px 10px;

        @media (max-width: 606px) {
            h3 {
                display: none;
            }
        }
    }

    .admin-menu-item:hover {
        color: var(--saints-gold-color);
        transition: 0.25s;
    }

    .admin-menu-item h3 {
        margin: 0px;
        margin-left: 10px;
        font-size: 18px;
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

    .active {
        * {
            color: var(--saints-gold-color) !important;
        }
    }
`;
