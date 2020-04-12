import styled from 'styled-components';

export const Wrapper = styled.main`
    height: 100%;
    background-color: #fff;

    .latest-news-wrapper {
        padding: 10px;

        h2 {
            text-align: left;
            padding-top: 5px;
            font-family: Roboto, Arial, Helvetica, sans-serif;
            font-weight: 400;
            padding-left: 8px;
        }

        @media (max-width: 606px) {
            padding: 10px 0px;
        }
    }

    .latest-grid {
        overflow: hidden;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 20px;
        padding: 10px;

        @media (max-width: 1000px) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        @media (max-width: 796px) {
            grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 606px) {
            grid-template-columns: 1fr;
        }
    }

    .more-content {
        text-align: center;
        margin: 10px 0px;
    }

    .error {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            text-align: center;
        }
    }
`;
