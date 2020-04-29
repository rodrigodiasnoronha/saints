import React, { useEffect, useRef, useState, memo } from 'react';
import firebase from '../../services/firebase';
import history from '../../services/history';
import { useParams } from 'react-router-dom';
import { Post, PostOwner } from '../../types';
import { toast } from 'react-toastify';
import { Footer, Header, Loader, Helmet } from '../../components';
import DisqusCommentsComponent from '../../components/DisqusComments';
import { PostWrapper } from './styles';
import { FiTwitter, FiCalendar as Calendar, FiFacebook } from 'react-icons/fi';
import { MdSentimentNeutral } from 'react-icons/md';
import {
    AiOutlineReddit,
    AiOutlineWhatsApp,
    AiOutlineMail,
} from 'react-icons/ai';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    RedditShareButton,
} from 'react-share';

const avatarPlaceholder =
    'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';

const PostViewComponent: React.FC = () => {
    const params = useParams<{ alias: string }>();
    const alias = useRef<string | null>(null);
    alias.current = params.alias;

    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [post, setPost] = useState<Post | null>(null);
    const [postOwner, setPostOwner] = useState<PostOwner | null>(null);

    useEffect(() => {
        getPost();
    }, []);

    async function getPost() {
        setLoadingPage(true);
        setError(false);

        try {
            const data = await firebase
                .firestore()
                .collection('posts')
                .where('alias', '==', alias.current)
                .get();

            if (data.empty) {
                setError(true);
                setLoadingPage(false);
                return toast.error('Nenhum post encontrado');
            }

            const postRef = data.docs[0];
            const postFound = postRef.data() as Post;
            postFound.id = postRef.id;

            setPost(postFound);
            addViewToPost(postFound.id, postFound.views || 0);
            setError(false);
            setLoadingPage(false);

            await getUserPostOwner(postFound.user_uid);
        } catch (error) {
            setError(true);
            setLoadingPage(false);
            return toast.error('Ocorreu um erro ao mostrar a postagem');
        }
    }

    async function addViewToPost(postId: string, viewsNumber: number) {
        firebase
            .firestore()
            .collection('posts')
            .doc(postId)
            .update({
                views: viewsNumber + 1,
            })
            .then(() => {})
            .catch(() =>
                console.log('Ocorreu um erro ao adicionar o view ao post')
            );
    }

    async function getUserPostOwner(user_uid: string) {
        try {
            const snapshot = await firebase
                .firestore()
                .collection('users')
                .doc(user_uid)
                .get();

            const owner = snapshot.data() as PostOwner;
            owner.id = snapshot.id;
            setPostOwner(owner);
        } catch (error) {
            console.log(error);
        }
    }

    const getPostDate = () =>
        `${new Date(post?.createdAt).getDate()}/${
            new Date(post?.createdAt).getMonth() + 1
        }/${new Date(post?.createdAt).getFullYear()}`;

    return (
        <>
            <Header />

            {loadingPage && <Loader />}

            {!loadingPage && !error && (
                <>
                    {/*
                     * Componente que adiciona as imagens no compartilhamento da postagem
                     * E ainda coloca as meta tags no head do html
                     */}
                    <Helmet
                        createdAt={post.createdAt}
                        title={post.title}
                        description={post.description}
                        imageUrl={post.imageUrl}
                        twitterUsername={postOwner?.twitter}
                    />

                    <PostWrapper image={post.imageUrl}>
                        <div className="post-title">
                            <h2 className="title">
                                {post.title}
                                <div className="post-date">
                                    <time>
                                        <Calendar size={20} />
                                        {getPostDate()}
                                    </time>
                                </div>
                            </h2>
                        </div>

                        <article className="post-content-wrapper container">
                            <div className="post-tags">
                                {post.tags?.map((tagTitle) => (
                                    <span
                                        key={Math.round(Math.random() * 1000)}
                                        onClick={() => {
                                            history.push(`/tags/${tagTitle}`);
                                        }}
                                        className="tag"
                                    >
                                        {tagTitle}
                                    </span>
                                ))}
                            </div>

                            <div className="post-description">
                                <h3>{post.description}</h3>
                            </div>

                            <div
                                className="post-content"
                                dangerouslySetInnerHTML={{
                                    __html: post.content,
                                }}
                            />

                            <div className="social-media-wrapper ">
                                <h5>Compartilhe com: </h5>

                                <div className="social-media">
                                    <TwitterShareButton
                                        url={window.location.href}
                                        title={post.title}
                                    >
                                        <FiTwitter size={30} className="icon" />
                                    </TwitterShareButton>

                                    <FacebookShareButton
                                        url={window.location.href}
                                        quote={post.title}
                                    >
                                        <FiFacebook
                                            className="icon"
                                            size={30}
                                        />
                                    </FacebookShareButton>

                                    <WhatsappShareButton
                                        title={post.title}
                                        separator={' '}
                                        url={window.location.href}
                                    >
                                        <AiOutlineWhatsApp
                                            className="icon"
                                            size={30}
                                        />
                                    </WhatsappShareButton>

                                    <EmailShareButton
                                        url={window.location.href}
                                        subject={post.title}
                                        body={post.description}
                                        separator=" "
                                    >
                                        <AiOutlineMail
                                            className="icon"
                                            size={30}
                                        />
                                    </EmailShareButton>

                                    <RedditShareButton
                                        title={post.title}
                                        url={window.location.href}
                                    >
                                        <AiOutlineReddit
                                            className="icon"
                                            size={30}
                                        />
                                    </RedditShareButton>
                                </div>
                            </div>

                            <div className="post-author">
                                <div className="author">
                                    <img
                                        src={
                                            postOwner?.avatar_url ||
                                            avatarPlaceholder
                                        }
                                        alt={postOwner?.name}
                                        title={postOwner?.name}
                                    />

                                    <div className="author-info">
                                        <h6 className="author-name">
                                            {postOwner?.name}
                                        </h6>
                                        <p className="author-bio">
                                            {postOwner?.bio}
                                        </p>
                                        {postOwner?.twitter && (
                                            <a
                                                target="__blank"
                                                href={`https://twitter.com/${postOwner?.twitter}`}
                                            >
                                                <FiTwitter
                                                    className="icon"
                                                    size={25}
                                                />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <DisqusCommentsComponent
                                articleId={post.id}
                                articleTitle={post.title}
                                articleUrl={window.location.href}
                            />
                        </article>

                        <Footer />
                    </PostWrapper>
                </>
            )}

            {!loadingPage && error && (
                <PostWrapper image="">
                    <div className="error">
                        <MdSentimentNeutral size={100} />
                        <h2>Ocorreu um erro ao mostrar a postagem</h2>
                        <button
                            onClick={getPost}
                            className="btn btn-dark btn-lg"
                        >
                            Tentar novamente
                        </button>
                    </div>
                    <Footer />
                </PostWrapper>
            )}
        </>
    );
};

export default memo(PostViewComponent);
