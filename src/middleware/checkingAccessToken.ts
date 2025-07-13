import { tokenService } from "../services/token";
import { Response, Request, NextFunction } from "express";

export const checkingAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			res.status(401).json({ error: "Please authenticate" });
			return;
		}

		const decoded = await tokenService.validateAccessToken(token);
		if (!decoded) {
			throw new Error("Invalid token");
		}
		req.body = decoded;

		next();
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
	}
};
