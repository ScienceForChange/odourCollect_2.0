import { token } from "./token";

export interface Auth {
    ok: boolean;
    data?: token;
    message?: string; 
}