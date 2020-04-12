import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

interface Props {
    articleUrl: string;
    articleId: string;
    articleTitle: string;
}

const DisqusCommentsComponent: React.FC<Props> = ({
    articleId,
    articleTitle,
    articleUrl
}) => (
    <DiscussionEmbed
        shortname="defensor-saints"
        config={{
            url: articleUrl,
            identifier: articleId,
            title: articleTitle
        }}
    />
);

export default DisqusCommentsComponent;
