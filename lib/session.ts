"use server";
import { cookies } from "next/headers";
// import { defaultSession, SessionData, sessionOptions } from "./config";
import { getIronSession } from "iron-session";
import { ISignUpPostResponse } from "@/app/api/auth/type";
import { defaultSession, SessionData, sessionOptions } from "./sessions/config";
// import { ISignUpPostResponse } from "@/app/api/auth/type";

export const getSession = async () => {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
};

export const setSession = async (res: ISignUpPostResponse) => {
    const session = await getSession();
    session.isLoggedIn = true;
    session.token = res.token;
    session.user = res.user;

    await session.save();
};

export const removeSession = async () => {
    const session = await getSession();
    session.destroy();
};