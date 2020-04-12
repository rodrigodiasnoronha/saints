import styled from 'styled-components';

interface Props {
    image: string;
}

export const PostWrapper = styled.div<Props>`
    height: 100%;
    width: 100%;

    .post-title {
        height: 100%;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;

        background: linear-gradient(to left, #d3bc8d, #212121);
        background: url(${props => props.image});
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;

        overflow: hidden;
        box-sizing: border-box;

        h2.title {
            margin: 0px;
            padding: 0px 25px;

            width: 100%;
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.6);
            color: #f5f5f5;

            font-size: 55px;
            font-weight: 400;
            font-family: Roboto, Arial, Helvetica, sans-serif;
            text-align: center;
            letter-spacing: 3px;

            @media (max-width: 576px) {
                font-size: 25px;
                padding: 0 10px;
            }
        }
    }

    .post-content-wrapper {
        margin-top: 15px;
        border-radius: 8px;
        padding: 35px;
        background: var(--bg-white);

        @media (max-width: 606px) {
            padding: 15px 10px;
        }

        .post-description > h3 {
            font-size: 45px;
            margin: 23px 0px;
            padding: 0px 10px;
            text-align: center;
            line-height: 1.3em;
            letter-spacing: initial;
            font-weight: 400;
            font-family: Roboto, Arial, Helvetica, sans-serif;
            color: #333;

            @media (max-width: 700px) {
                font-size: 26px;
                padding: 0px;
            }
        }
    }

    .post-date {
        margin-top: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .post-date time {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        font-family: Roboto, Arial, Helvetica, sans-serif;
        font-weight: 400;
        color: #f5f5f5;
    }

    .post-date time svg {
        margin-right: 8px;
    }

    .post-tags {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .tag {
        font-size: 14px;
        background: var(--bg-black);
        color: var(--text-white);
        margin: 5px;
        padding: 5px 10px;
        border-radius: 10px;
        cursor: pointer;
        font-family: Roboto, Arial;

        :hover {
            color: var(--saints-gold-color);
            transition: 0.25s;
        }
    }

    .post-content {
        margin-top: 10px;
        padding: 0px 5px;

        * {
            border-bottom: 2px solid transparent;
        }

        p {
            line-height: 28px;
            font-size: 17px;
            font-family: Roboto, Arial, Helvetica, sans-serif;
            color: #333;
        }

        a {
            color: var(--saints-gold-color) !important;
            font-weight: bold;

            :hover,
            :active,
            :focus {
                color: var(--saints-gold-color-dark) !important;
                transition: 0.5s;
            }
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            text-align: left;
        }

        @media (min-width: 0px) and (max-width: 799px) {
            p {
                padding: 0px;
            }
        }

        @media (min-width: 800px) and (max-width: 999px) {
            p {
                padding: 0px 25px;
                font-size: 18px;
            }
        }

        @media (min-width: 1000px) and (max-width: 1199px) {
            p {
                padding: 0px 100px;
                font-size: 18px;
            }
        }

        @media (min-width: 1200px) {
            p {
                padding: 0px 150px;
                font-size: 18px;
            }
        }

        img {
            width: 100%;
            padding: 30px;
            border-radius: 5px !important;

            @media (max-width: 606px) {
                padding: 5px;
            }
        }
    }

    .post-author {
        margin: 25px 0px 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-top: 1px solid var(--saints-gold-color);
        padding-top: 30px;
        margin-bottom: 0px;

        @media (max-width: 576px) {
            font-size: 18px;
        }
    }

    .author {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 0px;

        h6.author-name {
            margin: 7px 0px !important;
            font-size: 17px;
            color: #333;
            font-family: Roboto, Roboto, Arial, Helvetica, sans-serif;
            font-weight: normal;

            :hover,
            :focus {
                color: var(--saints-gold-color);
                transition: 0.25s;
                cursor: pointer;
            }
        }

        p.author-bio {
            font-size: 14px;
            text-align: center;
            color: #525252 !important;
            padding: 0px 10px;
            margin: 0px;
        }

        img {
            width: 100px;
            height: 100px;
            border-radius: 50px;

            @media (max-width: 606px) {
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
        }
    }

    .author-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .author-info a {
        margin-top: 10px;
    }

    .social-media-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 20px;
    }

    .social-media-wrapper h5 {
        color: var(--saints-black-color);
        font-family: Roboto, Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 10px;
    }

    .social-media-wrapper .social-media {
        display: flex;
    }

    .icon {
        color: var(--saints-black-color);
        margin-left: 7px;

        * {
            outline: 0px;
        }

        :hover,
        :active,
        :focus {
            color: #938362;
            transition: 0.25s;

            * {
                outline: 0;
            }
        }
    }

    .error {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .error h2 {
        text-align: center;
    }
`;
