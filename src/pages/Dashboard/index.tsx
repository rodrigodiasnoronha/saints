import React, { useEffect, useState, memo } from 'react';
import firebase from '../../services/firebase';
import { Post } from '../../types';
import AwesomeSlider from 'react-awesome-slider';
import { MdSentimentNeutral } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Footer, Notice, Loader, Header } from '../../components';
import history from '../../services/history';
import { Content } from './styles';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/open-animation.css';

const DashboardComponent: React.FC = () => {
    const [fiveLatestsPosts, setFiveLatestsPosts] = useState(new Array<Post>());
    const [latestsPosts, setLatestsPosts] = useState(new Array<Post>());
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [serverError, setServerError] = useState<boolean>(false);

    useEffect(() => {
        document.title = `Home | Defensor do Saints`;
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoadingPage(true);
        setServerError(false);

        try {
            // 5 últimas => recentes
            const snapshot = await firebase
                .firestore()
                .collection('posts')
                .orderBy('createdAt', 'desc')
                .limit(20)
                .get();

            if (snapshot.empty) {
                setServerError(true);
                setLoadingPage(false);
                return toast.error('Não há postagens para mostrar');
            }

            const arrayPosts = new Array<Post>();

            snapshot.docs.forEach((doc) => {
                let item = doc.data() as Post;
                item.id = doc.id;

                arrayPosts.push(item);
            });

            /**
             *
             * Adicionar os 5 últimos posts no array de 5 últimos posts, mas só se o array for maior que 5;
             *
             */
            if (arrayPosts.length > 4) {
                const [
                    first,
                    second,
                    thirth,
                    fourth,
                    fifth,
                    ...rest
                ] = arrayPosts;

                setFiveLatestsPosts([first, second, thirth, fourth, fifth]);
                setLatestsPosts(rest);
            } else {
                setFiveLatestsPosts(arrayPosts);
                setLatestsPosts(arrayPosts);
            }

            setLoadingPage(false);
            setServerError(false);
        } catch (error) {
            setLoadingPage(false);
            setServerError(true);
            return toast.error('Ocorreu um erro ao mostrar as postagens');
        }
    };

    return (
        <>
            <Header />

            {/* 
                Imprima caso esteja carregando a página 
            */}
            {loadingPage && <Loader />}

            {/* 
                Imprimir conteúdo 
            */}
            {!loadingPage && !serverError && (
                <Content>
                    <section className="five-latest-news-wrapper">
                        <div className="five-latest">
                            <AwesomeSlider
                                mobileTouch={true}
                                bullets={false}
                                animation="openAnimation"
                            >
                                {fiveLatestsPosts.map((late) => (
                                    <div
                                        key={late.id}
                                        data-src={late.imageUrl}
                                        className="notice-info"
                                    >
                                        <h2
                                            onClick={() =>
                                                history.push(
                                                    `/posts/${late.alias}`
                                                )
                                            }
                                        >
                                            {late.title}
                                        </h2>
                                        <h4
                                            onClick={() =>
                                                history.push(
                                                    `/posts/${late.alias}`
                                                )
                                            }
                                        >
                                            {late.description.length > 75
                                                ? late.description.substr(
                                                      0,
                                                      75
                                                  ) + '...'
                                                : late.description}
                                        </h4>
                                    </div>
                                ))}
                            </AwesomeSlider>
                        </div>
                    </section>

                    <section className="latest-news-wrapper">
                        <h2>Notícias recentes</h2>

                        <div className="latest-grid">
                            {latestsPosts.map((post) => (
                                <Notice key={post.id} data={post} />
                            ))}
                        </div>
                        <div className="more-content">
                            <button
                                className="btn btn-dark btn-block-sm "
                                type="button"
                                onClick={() => history.push('/posts')}
                            >
                                Veja mais notícias
                            </button>
                        </div>
                    </section>

                    <Footer />
                </Content>
            )}

            {/* 
               Erro ao mostrar os posts
            */}
            {!loadingPage && serverError && (
                <>
                    <Content>
                        <div className="error">
                            <MdSentimentNeutral size={100} />
                            <h2>Ocorreu um erro ao mostrar as postagens</h2>
                            <button
                                onClick={fetchPosts}
                                className="btn btn-dark btn-lg"
                            >
                                Tentar novamente
                            </button>
                        </div>
                    </Content>
                </>
            )}
        </>
    );
};

export default memo(DashboardComponent);
