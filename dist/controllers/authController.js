"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authResponse_1 = require("../utils/authResponse");
class AuthController {
    async register(req, res) {
        try {
            const { email } = req.body;
            const existingUser = await users_1.repository.getUserByEmail(email);
            if (existingUser) {
                res.status(400).send(authResponse_1.authResponse.errorResponse("User already exists"));
                return;
            }
            const newUser = await users_1.repository.createUser(req.body);
            if (!newUser) {
                res.status(401).send(authResponse_1.authResponse.errorResponse("User not created"));
                return;
            }
            const options = {
                expiresIn: "1h",
                algorithm: "HS256",
            };
            const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, options);
            res.status(201).json(authResponse_1.authResponse.successResponse(newUser, token));
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json(authResponse_1.authResponse.errorResponse(error.message));
            }
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await users_1.repository.getUserByEmail(email);
            if (!user) {
                res.status(401).json(authResponse_1.authResponse.errorResponse("Invalid credentials"));
                return;
            }
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json(authResponse_1.authResponse.errorResponse("Invalid credentials"));
                return;
            }
            const options = {
                expiresIn: "1h",
                algorithm: "HS256",
            };
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, options);
            res.status(201).json(authResponse_1.authResponse.successResponse(user, token));
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === "User not found") {
                    res.status(404).json(authResponse_1.authResponse.errorResponse("User not found"));
                }
                res.status(500).json(authResponse_1.authResponse.errorResponse("Internal Server Error"));
            }
        }
    }
    async getMe(req, res) {
        try {
            const { id } = req.body;
            const user = await users_1.repository.getUserById(id);
            if (!user) {
                res.status(404).json(authResponse_1.authResponse.errorResponse("User not found"));
                return;
            }
            const options = {
                expiresIn: "1h",
                algorithm: "HS256",
            };
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, options);
            res.status(200).json(authResponse_1.authResponse.successResponse(user, token));
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json(authResponse_1.authResponse.errorResponse(error.message));
            }
        }
    }
}
exports.authController = new AuthController();
