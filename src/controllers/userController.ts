import { repository } from "../models/users";
import { Response, Request } from "express";

class UserController {
	async getAllUsers(req: Request, res: Response) {
		const products = await repository.getAllUsers();

		res.send(products);
	}

	async getUserById(req: Request, res: Response) {
		try {
			const product = await repository.getUserById(+req.params.id);
			res.send(product);
		} catch (error) {
			res.status(404).send({
				message: `User ${+req.params.id} not found`,
			});
		}
	}

	async deleteUser(req: Request, res: Response) {
		try {
            await repository.deleteUser(+req.params.id);
    
            res.status(200).send({
                message: `User ${+req.params.id} deleted`,
            });
        } catch (error) {
            res.status(404).send({
                message: `User ${+req.params.id} not found`,
            });
        }
	}

	async updateUser(req: Request, res: Response) {
		try {
            const isUpdeted = await repository.updeteUser(+req.params.id, req.body);
            res.status(200).send(isUpdeted);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "User not found" || error.message === "User not updated") {
                    res.status(404).send({
                        message: error.message,
                    });
                } else {
                    res.status(500).send({
                        message: error.message,
                    });
                }
            }
        }
	}
	async createUser(req: Request, res: Response) {
		try {
			const newProducts = await repository.createUser(req.body);
			res.status(201).send(newProducts);
		} catch (error: unknown) {
			if (error instanceof Error) {
				if (error.message === "User not created" || error.message === "User already exists") {
					res.status(400).send({
						message: error.message,
					});
				} else {
					res.status(500).send({
						message: error.message,
					});
				}
			}
		}
	}
}

export const userController = new UserController();
