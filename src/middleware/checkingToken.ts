import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkingToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			throw new Error("Authentication required");
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
		req.body = decoded;

		next();
	} catch (error) {
		res.status(401).json({ error: "Please authenticate" });
	}
};
