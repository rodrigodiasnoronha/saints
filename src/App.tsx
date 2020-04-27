import React from 'react';
import { AuthProvider } from './contexts/Auth';
import GlobalStyles from './components/GlobalStyles';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => (
    <>
        <GlobalStyles />
        <ToastContainer autoClose={3000} />
        <AuthProvider>
            <Routes />
        </AuthProvider>
    </>
);

export default App;
