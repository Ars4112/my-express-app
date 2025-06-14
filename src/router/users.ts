import { userUpdateValidator } from "../validators/userValidator";
import { userController } from "../controllers/userController";
import { Router } from "express";
import { inputValidationMiddleware } from "../middleware/inputValidationMiddleware";

export const users = Router();

users.get("/", userController.getAllUsers);

users.get("/:id", userController.getUserById);

users.put("/:id", userUpdateValidator, inputValidationMiddleware, userController.updateUser);

users.delete("/:id", userController.deleteUser);
