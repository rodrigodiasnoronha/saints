import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
    title: string;
    imageUrl: string;
    description: string;
    twitterUsername?: string;
    createdAt: string;
}

const HelmetComponent: React.FC<Props> = ({
    description,
    imageUrl,
    title,
    twitterUsername,
    createdAt
}) => (
    <Helmet>
        <meta name="description" content={`Defensor Saints | ${description}`} />

        {/* Meta tags Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name={`twitter:site`} content="@saintsbr1967" />
        <meta name={`twitter:title`} content={title} />
        <meta name={`twitter:creator`} content={twitterUsername} />
        <meta name={`twitter:description`} content={description} />

        {/* imagens para o Twitter Summary Card precisam ter pelo menos 200×200 px */}
        <meta name={`twitter:image`} content={imageUrl} />

        {/* Para o sistema Open Graph */}
        <meta property={`og:title`} content={document.title} />
        <meta property={`og:url`} content={window.location.href} />
        <meta property={`og:type`} content={`article`} />
        <meta property={`og:site_name`} content={'Defensor do Saints'} />

        <meta
            name={`og:description`}
            content={`Defensor Saints | ${description}`}
        />
        <meta property="article:published_time" content={createdAt} />
        <meta
            property="article:tag"
            content="New Orleans Saints, Brasil, Futebol Americano, NFL, Drew Brees, Saints, National Football League, Super Bowl"
        />
    </Helmet>
);

export default HelmetComponent;
