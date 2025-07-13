import { validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({
			errors: errors.array(),
		});
	} else {
		next();
	}
};