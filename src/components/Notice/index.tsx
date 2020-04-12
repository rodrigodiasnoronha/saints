import React, { memo } from 'react';
import { Post } from '../../types';
import history from '../../services/history';
import { Wrapper } from './styles';

// Avatar para mostrar quando o post ainda estiver carregando
// const avatarPlaceholder =
//     'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';

interface Props {
    data: Post;
}

const NoticeComponent: React.FC<Props> = ({ data, ...rest }) => {
    const convertDate = (value: string) => {
        const data = new Date(value);
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    };

    return (
        <Wrapper {...rest}>
            <div className="image-and-tags">
                {data?.tags?.length && (
                    <span
                        className="tags"
                        onClick={event =>
                            history.push(`/tags/${data?.tags[0]}`)
                        }
                    >
                        {data?.tags[0]}{' '}
                    </span>
                )}

                <img
                    src={data.imageUrl}
                    alt={data.title}
                    title={data.title}
                    onClick={event => history.push(`/posts/${data.alias}`)}
                />
            </div>

            <div className="content-wrapper">
                <div className="title-wrapper">
                    <h3 onClick={event => history.push(`/posts/${data.alias}`)}>
                        {data.title}
                    </h3>
                </div>

                <div className="description-wrapper">
                    <p onClick={event => history.push(`/posts/${data.alias}`)}>
                        {data.description.length > 100
                            ? data.description.substr(0, 160) + '...'
                            : data.description}
                    </p>
                </div>

                <div className="info-wrapper">
                    <time>{convertDate(data.createdAt)}</time>
                </div>
            </div>
        </Wrapper>
    );
};

export default memo(NoticeComponent);
