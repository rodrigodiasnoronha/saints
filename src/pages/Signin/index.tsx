import React, { useEffect, useState, memo } from 'react';
import { useAuth } from '../../contexts/Auth';
import firebase from '../../services/firebase';
import { FaKey, FaRegUser } from 'react-icons/fa';
import { Input, Background, Header } from '../../components';
import { Form } from './styles';

interface FormHandle {
    email: string;
    password: string;
}

const SignInComponent: React.FC = () => {
    const [resetPass, setResetPass] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { login, resetPassWithEmail } = useAuth();

    useEffect(() => {
        document.title = 'Sign in | Defensor do Saints';

        localStorage.clear();

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                await firebase.auth().signOut();
            }
        });
    }, []);

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
                                onClick={() => setResetPass(true)}
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
                                onClick={() => setResetPass(false)}
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
