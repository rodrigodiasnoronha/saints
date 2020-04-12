import styled from 'styled-components';

const imageNotFound =
    'www.macedonrangeshalls.com.au/wp-content/uploads/2017/10/image-not-found.png';

interface Props {
    image?: string;
}

export const Wrapper = styled.div<Props>`
    display: flex;
    border-radius: 10px;
    box-shadow: 5px 0px 4px 4px rgba(0, 0, 0, 0.2);
    margin-top: 15px;
    overflow: hidden !important;

    .tags {
        flex: 1;

        background: url(${props => props.image || imageNotFound});
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;

        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;

        padding: 10px;

        span {
            background: var(--bg-white);
            color: var(--text-black);

            padding: 5px 8px;
            border-radius: 10px;
            cursor: pointer;

            :hover {
                color: var(--saints-gold-color);
                transition: 0.25s;
            }
        }
    }

    .info {
        flex: 2;
        padding: 10px;

        .title h4 {
            font-size: 18px;
            color: #424242;
            margin-top: 10px;
            cursor: pointer;
        }

        .description p {
            font-size: 16px;
            color: #616161;
            font-weight: 400;
            cursor: pointer;
        }
    }

    .author {
        display: flex;

        p {
            margin-right: 10px;

            .user-icon {
                margin-right: 5px;
            }
        }

        time {
            color: #616161;
        }
    }

    .actions {
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }
`;
