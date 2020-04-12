import styled from 'styled-components';

export const Wrapper = styled.footer.attrs({
    className: 'container'
})`
    width: 100%;
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;

    border-top: 1px solid var(--saints-gold-color);

    :hover {
        opacity: 0.99;
        transition: 0.25s;
    }

    .content {
        display: flex;
        flex-direction: column;
    }

    .logo-wrapper {
        flex: 1;
        box-sizing: border-box;
        overflow: hidden;
        margin-bottom: 10px;
    }

    .logo-wrapper img {
        width: 75px;
        cursor: pointer;
    }

    .social-network-wrapper {
        flex: 1;
        display: flex;
        justify-content: space-around;
    }

    .social-network {
        margin: 0px 5px;
        cursor: pointer;
        font-size: 14px;

        :hover {
            * {
                color: #bdbdbd !important;
                transition: 0.25s;
            }
        }
    }

    .social-network a {
        color: #444 !important;
    }

    .about {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #444;
    }
`;
