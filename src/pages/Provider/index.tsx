import React, { useEffect, useState } from 'react';
import firebase from '../../services/firebase';
import history from '../../services/history';
import { Post } from '../../types';
import PostAdmin from '../../components/PostAdmin';
import { toast } from 'react-toastify';
import { MdSentimentNeutral as NoContentIcon } from 'react-icons/md';
import Loader from '../../components/Loader';
import ProviderPainel from '../../components/ProviderPainel';
import { Content } from './styles';

const ProviderComponent: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(new Array<Post>());
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        document.title = 'Admin Painel | Defensor Saints';

        const user = localStorage.getItem('user');

        if (!user) {
            return history.push('/');
        }

        getPosts();
    }, []);

    const removePost = (postId: string) => {
        const newArrayPosts = posts.filter((post) => post.id !== postId);
        setPosts(newArrayPosts);
    };

    async function getPosts() {
        setError(false);
        setLoadingPage(true);

        try {
            const snapshot = await firebase
                .firestore()
                .collection('posts')
                .orderBy('views', 'desc')
                .limit(10)
                .get();

            if (snapshot.empty) {
                setError(true);
                setLoadingPage(false);

                return toast.error('Nenhum post para mostrar');
            }

            let arrayPosts = new Array<Post>();

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
            return toast.error('Ocorreu um erro ao mostrar os posts');
        }
    }

    const nextPage = async (lastPost: Post) => {
        try {
            const snapshot = await firebase
                .firestore()
                .collection('posts')
                .orderBy('alias', 'desc')
                .startAfter(lastPost.alias)
                .limit(10)
                .get();

            if (snapshot.empty) {
                return toast.error('Não há mais posts para vizualizar');
            }

            const newPosts = new Array<Post>();

            snapshot.docs.forEach((doc) => {
                let item = doc.data() as Post;
                item.id = doc.id;

                newPosts.push(item);
            });

            setPosts([...posts, ...newPosts]);
        } catch (error) {
            return toast.error(
                'Ocorreu um erro ao mostrar mais postagens. Tente novamente'
            );
        }
    };

    return (
        <ProviderPainel>
            <Content>
                {/* Carregando página */}
                {loadingPage && <Loader />}

                {/* Quando houver um erro ao mostrar os posts */}
                {!loadingPage && error && (
                    <div className="error">
                        <NoContentIcon size={100} />
                        <h2>Ocorreu um erro ao mostrar as postagens</h2>
                        <button
                            onClick={getPosts}
                            className="btn btn-dark btn-lg"
                        >
                            Tentar novamente
                        </button>
                    </div>
                )}

                {/* Imprimi os posts */}
                {!loadingPage &&
                    !error &&
                    posts?.map((post) => (
                        <PostAdmin
                            data={post}
                            actions={true}
                            removePost={removePost}
                            key={post.id}
                        />
                    ))}
                <button
                    type="button"
                    onClick={() => nextPage(posts[posts.length - 1])}
                    className="btn btn-primary btn-block btn-lg mt-3"
                >
                    Mais postagens
                </button>
            </Content>
        </ProviderPainel>
    );
};

export default ProviderComponent;
