/* eslint-disable @typescript-eslint/no-explicit-any */
// types/session.ts
import { IronSessionData } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    token?: string;
    user?: any; // you can type this properly later
  }
}