import styled from 'styled-components';

import backgroundImage from '../../assets/images/bg-saints.jpg';

export default styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${backgroundImage});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
`;