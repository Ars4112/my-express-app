import { ErrorResponse, SuccessResponse } from "../types/user";

export class UserResponse {
	successResponse<T>(data: T, meta?: Record<string, unknown>): SuccessResponse<T> {
		return {
			data,
			...(meta && { meta }),
		};
	}

    errorResponse( message: string, details?: Record<string, unknown> ): ErrorResponse {
		return {
			error: {
				message,
                ...(details && { details }),
			},
		};
	}
}

export const userResponse = new UserResponse();
