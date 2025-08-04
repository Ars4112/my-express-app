import { authResponse } from "../utils/authResponse";
import { tokenService } from "../services/token";
import { Response, Request, NextFunction } from "express";

export const checkingRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { refreshToken } = req.cookies;

		if (!refreshToken) {
			res.status(401).json(authResponse.errorResponse("Unauthorized"));
			return;
		}

		const userData = await tokenService.validateRefreshToken(refreshToken);

		if (!userData) {
			res.status(401).json(authResponse.errorResponse("Invalid refresh token111"));
			return;
		}

		if ("expired" in userData) {
			await tokenService.invalidateRefreshToken(refreshToken);
			res.status(401).json(authResponse.errorResponse("Refresh token expired"));
			return;
		}

		req.body = userData;

		next();
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
	}
};
