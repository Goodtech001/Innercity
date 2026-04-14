export interface ISignUpPostResponse {
    token?: string;
    user: IUser;
}

export interface IUser {
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