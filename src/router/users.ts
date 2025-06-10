import { userController } from "../controllers/userController";
import { Router} from "express";

export const users = Router();

users.get("/", userController.getAllUsers);

users.post("/", userController.createUser);

users.get("/:id", userController.getUserById);

users.put("/:id", userController.updateUser);

users.delete("/:id", userController.deleteUser);
