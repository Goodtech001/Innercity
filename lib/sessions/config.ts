import { SessionOptions } from "iron-session";

/**
 * This is an example of how to extend the built-in session data type.
 * You can add custom properties here, and then use them in your
 * application with `req.session.yourCustomProperty`.
 */

export interface UserSessionData {
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

export interface SessionData {
    token?: string;
    isLoggedIn: boolean;
    user?: UserSessionData;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!,
    cookieName: "seven-billion-meal-admin-session",
    cookieOptions: {
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Set to true in production
    },
};