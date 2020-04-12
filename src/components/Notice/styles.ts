import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: initial;
    max-height: 350px;
    border-radius: 3px;
    background: var(bg-white);
    /* box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2); */

    .image-and-tags {
        flex: 1;
        overflow: hidden;
        display: relative;

        border-top-right-radius: 3px;
        border-top-left-radius: 3px;

        img {
            width: 100%;
            cursor: pointer;
            border-top-right-radius: 3px;
            border-top-left-radius: 3px;

            :hover {
                transform: scale(1.1);
                transition: 1s;
                z-index: 2;
            }
        }
    }

    .tags {
        position: absolute;
        top: 5;
        left: 5;
        background: #fff;
        margin-top: 5px;
        margin-left: 5px;
        padding: 4px 5px;
        border-radius: 10px;
        cursor: pointer;
        overflow: hidden;
        z-index: 3;

        :hover,
        :focus {
            color: var(--saints-gold-color);
            transition: 0.25s;
        }
    }

    .content-wrapper {
        flex: 1;
        padding: 10px;
    }

    .title-wrapper {
        h3 {
            font-size: 16px;
            color: #333;
            cursor: pointer;
        }
    }

    .description-wrapper {
        p {
            margin: 0px;
            font-size: 14px;
            color: #616161;
            cursor: pointer;
        }
    }

    .info-wrapper {
        display: flex;
        align-items: center;

        margin: 5px 0px;

        time {
            color: #868e96;
            font-size: 12px;
            overflow: hidden;
        }
    }
`;
