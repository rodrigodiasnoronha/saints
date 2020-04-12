import styled from 'styled-components';

export const Content = styled.main`
    height: 100%;
    background-color: #fff;

    .five-latest {
        background: rgba(0, 0, 0, 0.5);
        color: var(--text-white);
        z-index: 1;

        .__bar {
            background-color: var(--saints-gold-color) !important;
        }

        * {
            outline: none;
        }

        h6 {
            text-align: center;
        }

        .notice-info {
            background: rgba(0, 0, 0, 0.7);
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 100;
            padding: 0px 100px;

            h2 {
                cursor: pointer;
                text-align: center;
                font-family: Roboto, Arial, Helvetica, sans-serif;
                font-weight: 400;
                font-size: 40px;
                letter-spacing: 3px;
                color: #f5f5f5;
            }
            h4 {
                cursor: pointer;
                text-align: center;
                font-family: Roboto, Roboto, Arial, Helvetica, sans-serif;
                font-weight: 400;
                letter-spacing: 1px;
                font-size: 25px;
                color: #f5f5f5;
            }

            @media (max-width: 700px) {
                padding: 0px 15px;
                background: rgba(0, 0, 0, 0.7);

                h2 {
                    font-size: 22px;
                }

                h4 {
                    font-size: 14px;
                }
            }
        }
    }

    .latest-news-wrapper {
        padding: 10px;
        margin-top: 5px;

        @media (min-width: 800px) {
            margin: 5px 10px 0px;
        }

        h2 {
            text-align: left;
            padding-left: 5px;
            font-family: Roboto, Arial, Helvetica, sans-serif;
            font-weight: 400;
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

    .most-views {
        padding: 10px;
        margin-top: 45px;
        border-top: 2px solid var(--bg-black);

        h2 {
            text-align: center;
            padding-top: 5px;
        }

        @media (max-width: 606px) {
            padding: 10px 0px;
        }
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
