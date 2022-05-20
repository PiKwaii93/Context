export type StatusType = 'error' | 'success';

export interface LoginResponseInterface {
    status: StatusType,
    message?: string,
    token?: string,
    username?: string
}

export interface BlogPostResponseInterface {
    status: StatusType,
    message: string
}

export interface BlogInterface {
    id?: number,
    date: string,
    title: string,
    content: string,
    author: string
}

export interface CommentInterface {
    id?: number,
    idFilm?: any,
    date?: string,
    text?: string,
    author?: string,
    titre?: string,
    description? : string
}

export interface FilmInterface {
    id?: number,
    titre: string,
    description : string
}
