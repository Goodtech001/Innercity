/* eslint-disable @typescript-eslint/no-explicit-any */
import "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: any;
    token?: string;
  }
}