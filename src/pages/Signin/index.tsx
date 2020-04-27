import React, { useContext, useEffect, useState, memo } from 'react';
import AuthContext from '../../contexts/Auth';
import history from '../../services/history';
import firebase from '../../services/firebase';
import { FaKey, FaRegUser } from 'react-icons/fa';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { Form } from './styles';
import { toast } from 'react-toastify';

interface FormHandle {
    email: string;
    password: string;
}

const SignInComponent: React.FC = () => {
    const [resetPass, setResetPass] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { login } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Sign in | Defensor do Saints';

        localStorage.clear();
    }, []);

    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            await firebase.auth().signOut();
        }
    });

    const handleSubmit = async (data: FormHandle) => {
        const { email, password } = data;

        setLoading(true);
        if (resetPass) {
            await resetPassWithEmail(email);
        } else {
            await login(email, password);
        }
        setLoading(false);
    };

    const resetPassWithEmail = async (email: string) => {
        if (!email.trim()) {
            return toast.error('Digite um e-mail para resetar a senha');
        }

        try {
            await firebase.auth().sendPasswordResetEmail(email);

            return toast.error('Um email foi enviado para reset de senha');
        } catch (error) {
            return toast.error(
                'Ocorreu um erro. Verifique seu e-mail e tente novamente'
            );
        }
    };

    return (
        <>
            <Header />

            <Background>
                <Form onSubmit={handleSubmit}>
                    {!resetPass && (
                        <>
                            <legend>
                                <FaRegUser size={60} />
                            </legend>

                            <div className="input-group">
                                <label htmlFor="email">E-mail</label>

                                <Input
                                    name="email"
                                    placeholder="E-mail"
                                    type="email"
                                    id="email"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Senha</label>

                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Senha"
                                    id="password"
                                    required
                                />
                            </div>

                            <button disabled={loading} type="submit">
                                {loading ? 'Carregando' : 'Login'}
                            </button>
                            <p
                                className="forgot-pass"
                                onClick={(event) => setResetPass(true)}
                            >
                                Esqueceu a senha?
                            </p>
                        </>
                    )}

                    {resetPass && (
                        <>
                            <legend>
                                <FaKey size={60} />
                            </legend>

                            <div className="input-group">
                                <label htmlFor="email">E-mail</label>

                                <Input
                                    name="email"
                                    placeholder="E-mail de recuperação"
                                    type="email"
                                    id="email"
                                    required
                                />
                            </div>
                            <button disabled={loading} type="submit">
                                {loading
                                    ? 'Carregando'
                                    : 'Enviar e-mail de recuperação'}
                            </button>
                            <p
                                className="forgot-pass"
                                onClick={(event) => setResetPass(false)}
                            >
                                Já possui conta?
                            </p>
                        </>
                    )}
                </Form>
            </Background>
        </>
    );
};

export default memo(SignInComponent);
