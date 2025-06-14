import { IAuth } from "@/types/auth";
import { ErrorResponse } from "../types/user";

class AuthResponse {
	successResponse<T>(data: T, token?: string): IAuth<T> {
		return {
			data,
			token: token || "",
		};
	}

	errorResponse(message: string, details?: Record<string, unknown>): ErrorResponse {
		return {
			error: {
				message,
				...(details && { details }),
			},
		};
	}
}

export const authResponse = new AuthResponse();
