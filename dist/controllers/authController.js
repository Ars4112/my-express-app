"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    async register(req, res) {
        try {
            const { email } = req.body;
            const existingUser = await users_1.repository.getUserByEmail(email);
            if (existingUser) {
                res.status(400).json({ message: "User already exists" });
                return;
            }
            const newUser = await users_1.repository.createUser(req.body);
            const options = {
                expiresIn: "1h",
                algorithm: "HS256",
            };
            const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, options);
            res.status(201).json({ message: "User created", token });
        }
        catch (error) {
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
    async login(req, res) { }
}
exports.authController = new AuthController();
