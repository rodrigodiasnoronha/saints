import styled from 'styled-components';

export const Content = styled.div`
    height: 100%;

    .form-wrapper {
        display: flex;
        flex-direction: row;
        width: 100%;

        @media (max-width: 700px) {
            flex-direction: column;
        }
    }

    .title {
        margin-top: 15px;
        padding-left: 10px;

        h4 {
            font-size: 28px;
            color: #616161;
        }
    }

    .form-post {
        display: flex;
        height: 100%;

        @media (max-width: 700px) {
            flex-direction: column;
        }
    }

    .input-group {
        display: flex;
        flex-direction: column;
        margin-top: 15px;

        label {
            margin: 0px;
            font-size: 18px;
            font-family: Roboto, Arial, Helvetica, sans-serif;
        }
    }

    .editor-wrapper {
        margin-top: 15px;
    }

    .form-button-submit-wrapper {
        margin-top: 15px;
    }

    .title-and-content {
        flex: 2;
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 5px 0px 4px 4px rgba(0, 0, 0, 0.2);
        height: initial;
    }

    .tags-container {
        flex: 1;
        padding: 0px 15px;

        @media (max-width: 700px) {
            padding: 0px;
        }
    }

    .tags-wrapper {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
    }

    .tags-list {
        padding: 10px;
        border-radius: 5px;
        box-shadow: 5px 0px 4px 4px rgba(0, 0, 0, 0.2);
        margin-bottom: 15px;
        overflow-y: scroll;
        max-height: 350px;

        h5 {
            font-size: 20px;
        }

        @media (max-width: 700px) {
            margin-top: 15px;
        }
    }
`;
