import { Response, Request } from "express";

export type IUserRequest<T> = Request<{ id: string }, {}, T>;
// export type IUserAuthRequest<T> = Request<{}, {}, T>;
export type IUserResponse<T> = Response<SuccessResponse<T> | ErrorResponse>;
// export type IUserAuthResponse<T> = Response<T>;

export type IUser = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
};

export type SuccessResponse<T> = {
	data: T;
	meta?: {
		page?: number;
		limit?: number;
		total?: number;
		[key: string]: unknown;
	};
};

export type ErrorResponse = {
	error: {
		message: string;
		details?: unknown;
	};
};

export type Message = {
	message: string;
};

export type IUserCreate = Omit<IUser, "id">;

export type IUserUpdate = Omit<Partial<IUserCreate>, "password">;

export type IUserLogin = Pick<IUser, "email" | "password">;

export type IUserOutput = Omit<IUser, "password">;
