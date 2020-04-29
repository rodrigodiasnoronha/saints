import React from 'react';
import firebase from '../../services/firebase';
import { Post } from '../../types';
import { MdCreate as EditIcon, MdDelete as DeleteIcon } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '../../services/history';
import { Wrapper } from './styles';

interface Props {
    data: Post;
    actions: boolean;
    removePost: Function;
}

const PostAdminComponent: React.FC<Props> = ({
    data,
    actions = false,
    removePost,
    ...rest
}) => {
    const deletePostHandler = (postId: string) => {
        firebase
            .firestore()
            .collection('posts')
            .doc(postId)
            .delete()
            .then(() => {
                removePost(postId);
                return toast.success('Post excluido com sucesso');
            })
            .catch(() => toast.error('Ocorreu um erro ao apagar o post'));
    };

    return (
        <Wrapper image={data.imageUrl} {...rest}>
            <div className="tags"></div>
            <div className="info">
                <div className="title">
                    <h4 onClick={() => history.push(`/posts/${data.alias}`)}>
                        {data.title.length > 100
                            ? data.title.substr(0, 100) + '...'
                            : data.title}{' '}
                    </h4>
                </div>
                <div className="description">
                    <p>
                        {data.description.length > 100
                            ? data.description.substr(0, 150) + '...'
                            : data.description}
                    </p>
                </div>

                <div className="author">
                    {actions && (
                        <div className="actions">
                            <button
                                type="button"
                                onClick={() =>
                                    history.push(
                                        `/provider/posts/edit/${data.id}`
                                    )
                                }
                                className="btn btn-primary btn-sm  mr-2"
                            >
                                <EditIcon size={25} />
                            </button>

                            <button
                                onClick={() => deletePostHandler(data.id)}
                                type="button"
                                className="btn btn-danger btn-sm mr-2"
                            >
                                <DeleteIcon size={25} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default PostAdminComponent;
