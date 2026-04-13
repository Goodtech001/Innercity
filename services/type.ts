export interface IPostLoginService {
    message: string;
    user: User;
    session: Session;
    error: { message: string | null } | null;
    status: number;
}

export interface User {
    id: number;
    admin: boolean;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Session {
    isLoggedIn: boolean;
    token: string;
    user: User;
}
