import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
    display: flex;

    @media (max-width: 700px) {
        flex-direction: column;
    }

    .user-info-wrapper {
        flex: 3;
        padding: 15px;
    }

    .profile-pic {
    }

    .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;

        label {
            margin: 0px;
        }
    }

    .form-wrapper {
        flex: 4;
        padding: 15px;
    }
`;
