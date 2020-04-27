import React, { createContext, useState, useEffect } from 'react';
import firebase from '../services/firebase';
import history from '../services/history';
import { toast } from 'react-toastify';

interface Auth {
    signed: boolean;
    login(email: string, password: string): Promise<string | number | void>;
    logOut(): Promise<void>;
}

const Context = createContext<Auth>({} as Auth);

export const AuthProvider: React.FC = ({ children }) => {
    const [signed, setSigned] = useState<boolean>(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            setSigned(true);
        } else {
            setSigned(false);
            localStorage.clear();
        }
    }, []);

    const login = async (email: string, password: string) => {
        if (!email.trim() || !password?.trim()) {
            return toast.error('Necessário preencher todos os campos');
        }

        return firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(makeLogin);

        async function makeLogin() {
            return firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(signInCallbackSuccess)
                .catch(signInCallbackError);
        }

        function signInCallbackSuccess(data: firebase.auth.UserCredential) {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('user_id', data.user.uid);
            setSigned(true);
            return history.push('/');
        }

        function signInCallbackError(error: firebase.auth.AuthError) {
            setSigned(false);
            switch (error.code) {
                case 'auth/wrong-password':
                    return toast.error('Sua senha está incorreta');

                case 'auth/user-not-found':
                    return toast.error(
                        'Esse e-mail não pertence a nenhum usuário'
                    );

                default:
                    return toast.error('Ocorreu um erro. Tente novamente');
            }
        }
    };

    const logOut = async () => {
        setSigned(false);
        await firebase.auth().signOut();
        localStorage.clear();
    };

    return (
        <Context.Provider value={{ signed, login, logOut }}>
            {children}
        </Context.Provider>
    );
};

export default Context;
