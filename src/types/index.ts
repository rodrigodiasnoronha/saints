export interface Post {
    id: string;
    title: string;
    alias: string;
    description: string;
    content: string;
    imageUrl: string;
    tags?: string[];
    views: number;
    user_uid: string;
    createdAt: string;
}

export interface Tag {
    id: string;
    title: string;
}

export interface PostOwner {
    id: string;
    name: string;
    email: string;
    twitter: string;
    avatar_url: string;
    bio: string;
}
