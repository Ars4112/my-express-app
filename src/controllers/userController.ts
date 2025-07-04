import { ErrorResponse, IUser, IUserCreate, IUserRequest, IUserResponse, IUserUpdate, Message } from "../types/user";
import { repository } from "../models/users";
import { Response, Request } from "express";
import { userResponse } from "../utils/usersResponse";

class UserController {
	async getAllUsers(req: Request, res: IUserResponse<IUser[]>) {
		try {
			const users = await repository.getAllUsers();

			if (!users) {
				res.status(404).send(userResponse.errorResponse("Users not found"));
				return;
			}

			res.send(userResponse.successResponse(users));
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send(userResponse.errorResponse(error.message));
			}
		}
	}

	async getUserById(req: Request, res: IUserResponse<IUser>) {
		try {
			const user = await repository.getUserById(+req.params.id);

			if (!user) {
				res.status(404).send(userResponse.errorResponse(`User ${+req.params.id} not found`));
				return;
			}

			res.send(userResponse.successResponse(user));
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send(userResponse.errorResponse(error.message));
			}
		}
	}

	async deleteUser(req: Request, res: Response<Message | ErrorResponse>) {
		try {
			const user = await repository.getUserById(+req.params.id);

			if (!user) {
				res.status(404).send(userResponse.errorResponse(`User ${+req.params.id} not found`));
				return;
			}
			const isDeleted = await repository.deleteUser(+req.params.id);

			if (!isDeleted) {
				res.status(401).send(userResponse.errorResponse(`User ${+req.params.id} not deleted`));

				return;
			}

			res.status(200).send({
				message: `User ${+req.params.id} deleted`,
			});
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send(userResponse.errorResponse(error.message));
			}
		}
	}

	async updateUser(req: IUserRequest<IUserUpdate>, res: Response<Message | ErrorResponse>) {
		try {
			const user = await repository.getUserById(+req.params.id);
			if (!user) {
				res.status(404).send(userResponse.errorResponse(`User ${+req.params.id} not found`));
				return;
			}

			const isUpdeted = await repository.updeteUser(+req.params.id, req.body);

			if (!isUpdeted) {
				res.status(401).send(userResponse.errorResponse(`User ${+req.params.id} not updated`));
				return;
			}

			res.status(200);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send(userResponse.errorResponse(error.message));
			}
		}
	}
	async createUser(req: IUserRequest<IUserCreate>, res: IUserResponse<IUser>) {
		try {
			const { email } = req.body;
			const existingUser = await repository.getUserByEmail(email);

			if (existingUser) {
				res.status(400).send(userResponse.errorResponse("User already exists"));
				return;
			}
			const newUser = await repository.createUser(req.body);

			if (!newUser) {
				res.status(401).send(userResponse.errorResponse("User not created"));

				return;
			}

			res.status(201).send(userResponse.successResponse(newUser));
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(500).send(userResponse.errorResponse(error.message));
			}
		}
	}
}

export const userController = new UserController();
