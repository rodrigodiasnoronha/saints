import React, { memo, useEffect, useState } from 'react';
import { Post } from '../../types';
import firebase from '../../services/firebase';
import { Header, Footer, Loader, Notice } from '../../components';
import { MdSentimentNeutral } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Wrapper } from './styles';

const NoticesComponent: React.FC = () => {
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [noMorePosts, setNoMorePosts] = useState<boolean>(false);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        setLoadingPage(true);
        setError(false);

        try {
            const snapshot = await firebase
                .firestore()
                .collection('posts')
                .orderBy('createdAt', 'desc')
                .limit(10)
                .get();

            if (snapshot.empty) {
                setLoadingPage(false);
                setError(true);
                return toast.error('Não há posts para mostrar');
            }

            const arrayPosts = new Array<Post>();

            snapshot.docs.forEach((doc) => {
                let item = doc.data() as Post;
                item.id = doc.id;

                arrayPosts.push(item);
            });

            setPosts(arrayPosts);
            setLoadingPage(false);
            setError(false);
        } catch (error) {
            setLoadingPage(false);
            setError(true);
            return toast.error('Ocorreu um erro ao mostrar as postagens');
        }
    };

    const loadMorePostsHandler = async () => {
        try {
            if (!posts.length) {
                return 0;
            }

            const lastPost = posts[posts.length - 1];

            const snapshot = await firebase
                .firestore()
                .collection('posts')
                .orderBy('createdAt', 'desc')
                .startAfter(lastPost.createdAt)
                .limit(10)
                .get();

            if (snapshot.empty) {
                setNoMorePosts(true);
                return 0;
            }

            const arrayNewPosts = new Array<Post>();

            snapshot.docs.forEach((doc) => {
                let item = doc.data() as Post;
                item.id = doc.id;

                arrayNewPosts.push(item);
            });

            setPosts([...posts, ...arrayNewPosts]);
        } catch (error) {
            setLoadingPage(false);
            setError(true);
            return toast.error('Ocorreu um erro ao carregar mais postagens');
        }
    };

    return (
        <>
            <Header />

            <Wrapper>
                {/* Carregando página */}
                {loadingPage && <Loader />}

                {/* Imprimir posts */}
                {!loadingPage && !error && (
                    <>
                        <section className="latest-news-wrapper">
                            <h2>Notícias recentes</h2>

                            <div className="latest-grid">
                                {posts?.map((post) => (
                                    <Notice key={post.id} data={post} />
                                ))}
                            </div>
                            <div className="more-content">
                                <button
                                    className="btn btn-dark btn-sm-block "
                                    type="button"
                                    onClick={loadMorePostsHandler}
                                    disabled={noMorePosts}
                                >
                                    {noMorePosts
                                        ? 'Não há mais notícias para mostrar'
                                        : 'Carregar mais notícias'}
                                </button>
                            </div>
                        </section>
                    </>
                )}

                {/* Erro ao pegar os posts */}
                {!loadingPage && error && (
                    <div className="error">
                        <MdSentimentNeutral size={100} />
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

export default memo(NoticesComponent);
