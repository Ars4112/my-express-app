import { loginValidator, registerValidator } from "../validators/authValidator";
import { authController } from "../controllers/authController";
import { Router } from "express";
import { checkingToken } from "../middleware/checkingToken";
import { inputValidationMiddleware } from "../middleware/inputValidationMiddleware";

export const auth = Router();

auth.post("/register",registerValidator, inputValidationMiddleware, authController.register);
auth.post("/login",loginValidator, inputValidationMiddleware, authController.login);
auth.get('/me',checkingToken, authController.getMe)