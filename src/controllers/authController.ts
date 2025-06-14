import { Response, Request } from "express";
import { repository } from "../models/users";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser, IUserCreate } from "../types/user";
import { IAuthRequest, IAuthResponse } from "../types/auth";
import { authResponse } from "../utils/authResponse";
class AuthController {
	async register(req: IAuthRequest<IUserCreate>, res: IAuthResponse<IUser>) {
		try {
			const { email } = req.body;

			const existingUser = await repository.getUserByEmail(email);
			if (existingUser) {
				res.status(400).send(authResponse.errorResponse("User already exists"));
				return;
			}

			const newUser = await repository.createUser(req.body);

			if (!newUser) {
				res.status(401).send(authResponse.errorResponse("User not created"));

				return;
			}

			const options: SignOptions = {
				expiresIn: "1h",
				algorithm: "HS256",
			};

			const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET as string, options);

			res.status(201).json(authResponse.successResponse(newUser, token));
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(500).json(authResponse.errorResponse(error.message));
			}
		}
	}

	async login(req: Request, res: IAuthResponse<IUser>) {
		try {
			const { email, password } = req.body;
			const user = await repository.getUserByEmail(email);
			if (!user) {
				res.status(401).json(authResponse.errorResponse("Invalid credentials"));
				return;
			}
			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				res.status(401).json(authResponse.errorResponse("Invalid credentials"));
				return;
			}

			const options: SignOptions = {
				expiresIn: "1h",
				algorithm: "HS256",
			};

			const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, options);

			res.status(201).json(authResponse.successResponse(user, token));
		} catch (error: unknown) {
			if (error instanceof Error) {
				if (error.message === "User not found") {
					res.status(404).json(authResponse.errorResponse("User not found"));
				}
				res.status(500).json(authResponse.errorResponse("Internal Server Error"));
			}
		}
	}

	async getMe(req: Request, res: Response) {
		try {
			const { id } = req.body;
			const user = await repository.getUserById(id);

			if (!user) {
				res.status(404).json(authResponse.errorResponse("User not found"));
				return;
			}

            const options: SignOptions = {
				expiresIn: "1h",
				algorithm: "HS256",
			};

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, options);

			res.status(200).json(authResponse.successResponse(user, token));
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json(authResponse.errorResponse(error.message));
			}
		}
	}
}

export const authController = new AuthController();
