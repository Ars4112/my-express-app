import { Response, Request } from "express";
import { repository } from "../models/users";
import jwt, { SignOptions } from "jsonwebtoken";
class AuthController {
	async register(req: Request, res: Response) {
		try {
			const { email } = req.body;

			const existingUser = await repository.getUserByEmail(email);
			if (existingUser) {
				res.status(400).json({ message: "User already exists" });
				return;
			}
			const newUser = await repository.createUser(req.body);

			const options: SignOptions = {
				expiresIn: "1h",
				algorithm: "HS256",
			};

			const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET as string, options);

			res.status(201).json({ message: "User created", token });
		} catch (error: unknown) {
			if (error instanceof Error) {
				if (error.message === "User not created" || error.message === "User already exists") {
					res.status(400).json({
						message: error.message,
					});
				}
				res.status(500).json({ message: error.message });
			}
		}
	}

	async login(req: Request, res: Response) {}
}

export const authController = new AuthController();
