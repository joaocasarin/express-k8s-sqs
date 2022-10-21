export interface Post {
    text: string;
    createdAt: string;
    authorId: number;
}

export interface PostResponse extends Post {
    id: number;
}
