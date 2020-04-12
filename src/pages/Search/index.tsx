import React, { useEffect, useState, memo } from 'react';
import { Post } from '../../types';
import firebase from '../../services/firebase';
import { MdSentimentNeutral } from 'react-icons/md';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Notice from '../../components/Notice';
import { Wrapper } from '../Tag/styles';
import { FireSQL } from 'firesql';

const SearchComponent: React.FC = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [serverError, setServerError] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[] | null>(null);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        setLoadingPage(true);
        setServerError(false);

        const query = urlParams.get('query');
        document.title = `${query} | Defensor do Saints`;

        const dbRef = firebase.firestore();
        const fireSql = new FireSQL(dbRef);

        try {
            const snapshot = (await fireSql.query(
                `
                SELECT * 
                FROM posts
                WHERE title LIKE '${query}%'
                LIMIT ${100}
            `
            )) as Post[];

            const arrayPosts = new Array<Post>();

            if (!snapshot.length) {
                setLoadingPage(false);
                setServerError(false);
                return 0;
            }

            snapshot.forEach(doc => {
                doc.id = `${Date.now()}-${Math.round(Math.random() * 10000)}`;
                arrayPosts.push(doc);
            });

            setPosts(arrayPosts);

            setLoadingPage(false);
            setServerError(false);
        } catch (error) {
            setServerError(true);
            setLoadingPage(false);
            console.log(error);
            return toast.error('Ocorreu um erro ao mostrar as postagens');
        }
    };

    return (
        <>
            <Header />
            <Wrapper>
                {loadingPage && <Loader />}

                {!loadingPage && !serverError && (
                    <>
                        <section className="posts-wrapper">
                            <h2>Resultado de: {urlParams.get('query')}</h2>

                            <div className="posts-grid">
                                {posts?.map(post => (
                                    <Notice key={post.id} data={post} />
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {/* Erro ao mostrar os posts */}
                {!loadingPage && serverError && (
                    <div className="error">
                        <MdSentimentNeutral size={100} />
                        <h2>Ocorreu um erro ao mostrar as postagens</h2>
                        <button
                            onClick={getPosts}
                            className="btn btn-dark btn-lg"
                        >
                            Tentar novamente
                        </button>
                    </div>
                )}

                <Footer />
            </Wrapper>
        </>
    );
};

export default memo(SearchComponent);
