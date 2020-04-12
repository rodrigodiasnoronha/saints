import React, { memo } from 'react';
import firebase from '../../services/firebase';
import { FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import history from '../../services/history';
import { Wrapper } from './styles';

interface Props {
    signed: boolean;
}

const SocialMediaComponent: React.FC<Props> = ({ signed }) => {
    async function handleLogOff() {
        localStorage.removeItem('user_id');
        await firebase.auth().signOut();
        history.push('/signin');
    }

    return (
        <Wrapper>
            <a href="https://twitter.com/nosaints1967" target="__blank">
                <FaTwitter color={'#1DA1F2'} size={25} />
            </a>
            <a href="mailto:rodrigonoronha09@gmail.com">
                <MdEmail color={'#657786'} size={25} />
            </a>
            {signed && (
                <div
                    onClick={handleLogOff}
                    style={{ marginLeft: 2, cursor: 'pointer' }}
                >
                    SAIR
                </div>
            )}
        </Wrapper>
    );
};

export default memo(SocialMediaComponent);
