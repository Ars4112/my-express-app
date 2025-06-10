import { loginValidator, registerValidator } from "../validators/authValidator";
import { authController } from "../controllers/authController";
import { Router } from "express";

export const auth = Router();

auth.post("/register",registerValidator, authController.register);
auth.post("/login",loginValidator, authController.login);
