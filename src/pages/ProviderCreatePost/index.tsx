import React, { useEffect, useRef, useState, memo } from 'react';
import { Tag, Post } from '../../types';
import history from '../../services/history';
import firebase from '../../services/firebase';
import { FormHandles } from '@unform/core';
import ProviderPainel from '../../components/ProviderPainel';
import Input from '../../components/Input';
import TextAreaInput from '../../components/TextAreaInput';
import Loader from '../../components/Loader';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Content } from './styles';
import { Form } from '@unform/web';
import { useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';

interface FormTag {
    title: string;
}

interface FormPost {
    title: string;
    alias: string;
    description: string;
}

const ProviderCreatePost: React.FC = () => {
    const params = useParams<{ id?: string }>();

    const editor = useRef<any>(null);
    const formRef = useRef<FormHandles | null>(null);

    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>(new Array<Tag>());
    const [selectedTags, setSelectedTags] = useState(new Array<string>());
    const [imageUrl, setImageUrl] = useState<string>('');
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [noMoreTagsToLoad, setNoMoreTagsToLoad] = useState<boolean>(false);
    const [postToEdit, setPostToEdit] = useState<Post | null>(null);

    useEffect(() => {
        document.title = 'Criar Post | Defensor do Saints';

        const user = localStorage.getItem('user');
        if (!user) {
            return history.push('/');
        }

        getTagsWhenLoadPage();

        if (params.id) {
            getPostToEdit();
        }
    }, []);

    const getPostToEdit = async () => {
        try {
            const snapshot = await firebase
                .firestore()
                .collection('posts')
                .doc(params.id)
                .get();

            if (!snapshot.exists) {
                history.push('/provider');
                return toast.error('Postagem não encontrada');
            }

            const postToEdit = snapshot.data() as Post;
            postToEdit.id = snapshot.id;

            // OBJECT TAGS TO ARRAY
            if (postToEdit?.tags) {
                const arrayTags = Object.keys(postToEdit?.tags);
                setSelectedTags(arrayTags);
            }

            if (postToEdit?.tags) {
                setSelectedTags(postToEdit.tags);
            }

            setContent(postToEdit.content);
            setImageUrl(postToEdit?.imageUrl);
            setPostToEdit(postToEdit);
        } catch (error) {
            return toast.error(
                'Ocorreu um erro ao mostrar a postagem a ser editada'
            );
        }
    };

    const getTagsWhenLoadPage = async () => {
        try {
            const data = await firebase
                .firestore()
                .collection('tags')
                .orderBy('title', 'asc')
                .limit(5)
                .get();

            const arrayTags: Tag[] = new Array<Tag>();

            data.forEach(doc => {
                let tag = doc.data() as Tag;
                tag.id = doc.id;

                arrayTags.push(tag);
            });

            setTags(arrayTags);
            setLoadingPage(false);
        } catch (error) {
            return toast.error('Ocorreu um erro ao mostrar as tags');
        }
    };

    const createTagSubmitHandler = async (data: FormTag) => {
        const { title } = data;
        const user_uid: string = localStorage.getItem('user_id') || '';

        return firebase
            .firestore()
            .collection('tags')
            .add({ title, user_uid })
            .then(createTagSuccess)
            .catch(createTagError);

        async function createTagSuccess(
            data: firebase.firestore.DocumentReference<
                firebase.firestore.DocumentData
            >
        ) {
            const tagRef = await data.get();
            const newTag = tagRef.data() as Tag;
            newTag.id = tagRef.id;

            setTags([...tags, newTag]);

            formRef.current?.reset();

            return toast('Tag criada com sucesso');
        }

        function createTagError(err: firebase.firestore.FirestoreError) {
            console.log(err);
            return toast.error('Ocorreu um erro ao criar a tag');
        }
    };

    const deleteTagHandler = (tagId: string) => {
        firebase
            .firestore()
            .collection('tags')
            .doc(tagId)
            .delete()
            .then(() => toast('Tag excluida com sucesso'))
            .catch(() => toast.error('Ocorreu um erro ao excluir a tag'));
    };

    const selectTagHandler = (tag: Tag) => {
        if (selectedTags.includes(tag.title)) {
            const filterTags = (title: string) => title !== tag.title;
            const newSelectedTags = selectedTags.filter(filterTags);
            setSelectedTags(newSelectedTags);
        } else {
            setSelectedTags([...selectedTags, tag.title]);
        }
    };

    const selectAnImageHandler = async (image: File) => {
        if (!image) {
            toast.error('Necessário selectionar uma imagem');
            return 0;
        }

        const pathWithFilename = `post_images/${Date.now()}-${image?.name}`;

        try {
            const snapshot = await firebase
                .storage()
                .ref(pathWithFilename)
                .put(image);

            const url = await snapshot.ref.getDownloadURL();
            setImageUrl(url);

            return toast('Upload concluido');
        } catch (error) {
            return toast.error('Ocorreu um erro ao fazer o upload da imagem');
        }
    };

    const loadMoreTagsHandler = async () => {
        if (!tags.length) {
            return toast.error('Não há mais tags para carregar');
        }

        const lastTag = tags[tags.length - 1];

        try {
            const snapshot = await firebase
                .firestore()
                .collection('tags')
                .orderBy('title', 'asc')
                .startAfter(lastTag.title)
                .limit(5)
                .get();

            if (snapshot.empty) {
                setNoMoreTagsToLoad(true);
                return toast.error('Não há mais tags para mostrar');
            }

            const newTags = new Array<Tag>();

            snapshot.docs.forEach(doc => {
                const item = doc.data() as Tag;
                item.id = doc.id;

                newTags.push(item);
            });

            setTags([...tags, ...newTags]);
        } catch (error) {
            return toast.error('Ocorreu um erro ao mostrar mais tags');
        }
    };

    const createPostSubmitHandler = async (data: FormPost) => {
        const { alias, title, description } = data;
        const createdAt = new Date().toISOString();
        const user_uid = localStorage.getItem('user_id') || '';

        const postTags = selectedTags;

        if (postToEdit) {
            await editPostSubmitHandler(data, postTags);
            return 0;
        }

        const isAlreadyRegistered: boolean = await isAliasAlreadyRegistered(
            alias
        );

        if (isAlreadyRegistered) {
            return 0;
        }

        try {
            await firebase
                .firestore()
                .collection('posts')
                .add({
                    title,
                    description,
                    content,
                    alias,
                    tags: postTags,
                    imageUrl,
                    views: 0,
                    user_uid,
                    createdAt
                });

            toast('Post criado com successo');
            history.push(`/posts/${alias}`);
        } catch (error) {
            return toast.error('Ocorreu um erro ao criar o post');
        }
    };

    const editPostSubmitHandler = async (data: FormPost, postTags: object) => {
        const { alias, title, description } = data;

        try {
            await firebase
                .firestore()
                .collection('posts')
                .doc(params.id)
                .update({
                    title,
                    description,
                    content,
                    alias,
                    tags: postTags,
                    imageUrl
                });

            history.push(`/posts/${data.alias}`);
            return toast.success('Postagem editada com sucesso');
        } catch (error) {
            return toast.error('Ocorreu um erro ao salvar a postagem editada');
        }
    };

    const isAliasAlreadyRegistered = async (postAlias: string) => {
        try {
            const snapshot = await firebase
                .firestore()
                .collection('posts')
                .where('alias', '==', postAlias)
                .get();

            if (!snapshot.empty) {
                toast.error('Esse alias já está registrado');
                return true;
            } else {
                return false;
            }
        } catch (error) {
            toast.error(
                'Ocorreu um erro ao verificar se o alias já está registrado'
            );
            return true;
        }
    };

    return (
        <ProviderPainel>
            <Content>
                {loadingPage && <Loader />}

                {!loadingPage && (
                    <>
                        <div className="title">
                            <h4>Create Post </h4>
                        </div>
                        <div className="form-wrapper">
                            <Form
                                initialData={postToEdit}
                                style={{ flex: 2 }}
                                className="form-post"
                                onSubmit={createPostSubmitHandler}
                            >
                                <div className="title-and-content">
                                    <div className="input-group">
                                        <label htmlFor="title">Title</label>
                                        <TextAreaInput
                                            name="title"
                                            className="form-control"
                                            placeholder="Once upon time..."
                                            id="title"
                                            required
                                        ></TextAreaInput>
                                    </div>

                                    <div className="input-group">
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <TextAreaInput
                                            className="form-control"
                                            name="description"
                                            placeholder="A beautiful queen"
                                            id="description"
                                            required
                                        ></TextAreaInput>
                                    </div>

                                    <div className="input-group">
                                        <label htmlFor="">Alias</label>
                                        <TextAreaInput
                                            className="form-control"
                                            name="alias"
                                            placeholder="this-is-an-alias-its-need-be-without-spaces "
                                            disabled={!!postToEdit}
                                            required
                                        ></TextAreaInput>
                                    </div>

                                    <div className="custom-file mt-3">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="post-image"
                                            onChange={event =>
                                                selectAnImageHandler(
                                                    event.target.files[0]
                                                )
                                            }
                                        />

                                        <label
                                            className="custom-file-label"
                                            htmlFor="post-image"
                                        >
                                            {imageUrl
                                                ? 'Upload completo'
                                                : 'Choose an image'}
                                        </label>
                                    </div>

                                    <div className="editor-wrapper">
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={{ readonly: false }}
                                            onBlur={setContent} // preferred to use only this option to update the content for performance reasons
                                        />
                                    </div>

                                    <div className="form-button-submit-wrapper">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            {postToEdit
                                                ? 'Edit post'
                                                : 'Create post'}
                                        </button>

                                        <button
                                            className="btn btn-danger ml-2"
                                            type="button"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Form>

                            <Form
                                style={{ flex: 1 }}
                                className="form-post"
                                onSubmit={createTagSubmitHandler}
                                ref={formRef}
                            >
                                <div className="tags-container">
                                    <div className="tags-list">
                                        <h5>Tags</h5>

                                        {tags?.map(tag => (
                                            <div
                                                key={tag.id}
                                                className="custom-control custom-checkbox tags-wrapper"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    value={`${tag.id}-${tag.title}`}
                                                    checked={selectedTags.includes(
                                                        tag.title
                                                    )}
                                                    onChange={event =>
                                                        selectTagHandler(tag)
                                                    }
                                                    style={{ zIndex: 5 }}
                                                />

                                                <label
                                                    className="custom-control-label"
                                                    htmlFor={`${tag.id}-${tag.title}`}
                                                >
                                                    {tag.title}
                                                </label>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    type="button"
                                                    onClick={event =>
                                                        deleteTagHandler(tag.id)
                                                    }
                                                >
                                                    <MdDelete size={15} />
                                                </button>
                                            </div>
                                        ))}
                                        <div className="text-center mt-2">
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-block "
                                                onClick={loadMoreTagsHandler}
                                                disabled={noMoreTagsToLoad}
                                            >
                                                {noMoreTagsToLoad
                                                    ? 'No more tags'
                                                    : 'More'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="tags-create tags-list">
                                        <h5>Create tag</h5>
                                        <div>
                                            <div className="input-group">
                                                <label htmlFor="newtagtitle">
                                                    Title
                                                </label>
                                                <Input
                                                    name="title"
                                                    placeholder="Title"
                                                    id="newtagtitle"
                                                />
                                            </div>

                                            <div className="mt-2">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >
                                                    Create Tag
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-danger ml-2 "
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </>
                )}
            </Content>
        </ProviderPainel>
    );
};

export default memo(ProviderCreatePost);
