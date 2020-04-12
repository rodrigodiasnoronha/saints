import React, { useEffect, useState, memo } from 'react';
import firebase from '../../services/firebase';
import history from '../../services/history';
import { Post } from '../../types';
import { MdSentimentNeutral } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Notice from '../../components/Notice';
import { Wrapper } from './styles';

const TagComponent: React.FC = () => {
    const params = useParams<{ alias: string }>();

    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        document.title = `Postagens | Defensor do Saints`;
        getPosts();
    }, []);

    useEffect(() => {
        setLoadingPage(true);
        getPosts();
    }, [params.alias]);

    const getPosts = async () => {
        if (!params.alias) {
            history.push('/posts');
        }

        setLoadingPage(true);
        setError(false);

        try {
            const snapshot = await firebase
                .firestore()
                .collection('posts')
                .where('tags', 'array-contains', params.alias)
                .limit(100)
                .get();

            if (snapshot.empty) {
                setLoadingPage(false);
                setError(true);
                return toast.error('Não há postagens para mostrar');
            }

            const arrayPosts: Post[] = new Array<Post>();

            snapshot.docs.forEach(doc => {
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

    return (
        <>
            <Header />

            {loadingPage && <Loader />}

            {!loadingPage && !error && (
                <Wrapper>
                    <section className="posts-wrapper">
                        <h2>
                            {params.alias ? (
                                <>
                                    Tag:<strong>{' ' + params.alias}</strong>
                                </>
                            ) : (
                                'Posts'
                            )}
                        </h2>

                        <div className="posts-grid">
                            {posts?.map(post => (
                                <Notice key={post.id} data={post} />
                            ))}
                        </div>
                    </section>
                    <Footer />
                </Wrapper>
            )}

            {!loadingPage && error && (
                <Wrapper>
                    <div className="error">
                        <MdSentimentNeutral size={100} />
                        <button
                            onClick={getPosts}
                            className="btn btn-dark btn-lg"
                        >
                            Tentar novamente
                        </button>
                    </div>
                    <Footer />
                </Wrapper>
            )}
        </>
    );
};

export default memo(TagComponent);
