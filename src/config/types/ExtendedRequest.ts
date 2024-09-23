import { Request } from "express";

export interface ExtendedRequest extends Request {
    authorization?: {
        data: object;
    };
    authToken?: string;
    loggedIn?: boolean;
    data?: any;
}