import { Response, Request } from "express";
import { ErrorResponse } from "./user";

export type IAuthRequest<T> = Request<{}, {}, T>;
export type IAuthResponse<T> = Response<IAuth<T> | ErrorResponse>;
export type IAuth<T> = {
	data: T;
	token: string;
};
