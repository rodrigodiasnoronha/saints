import styled from 'styled-components';

export default styled.input`
    line-height: 35px;
    border-radius: 5px;
    border: 2px solid #ccc;
    padding-left: 8px;
    font-weight: normal;

    :focus,
    :active {
        border: 2px solid var(--saints-gold-color);
        transition: 0.25s;
    }
`;
