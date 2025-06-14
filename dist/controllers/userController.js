"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const users_1 = require("../models/users");
const usersResponse_1 = require("../utils/usersResponse");
class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await users_1.repository.getAllUsers();
            if (!users) {
                res.status(404).send(usersResponse_1.userResponse.errorResponse("Users not found"));
                return;
            }
            res.send(usersResponse_1.userResponse.successResponse(users));
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).send(usersResponse_1.userResponse.errorResponse(error.message));
            }
        }
    }
    async getUserById(req, res) {
        try {
            const user = await users_1.repository.getUserById(+req.params.id);
            if (!user) {
                res.status(404).send(usersResponse_1.userResponse.errorResponse(`User ${+req.params.id} not found`));
                return;
            }
            res.send(usersResponse_1.userResponse.successResponse(user));
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).send(usersResponse_1.userResponse.errorResponse(error.message));
            }
        }
    }
    async deleteUser(req, res) {
        try {
            const user = await users_1.repository.getUserById(+req.params.id);
            if (!user) {
                res.status(404).send(usersResponse_1.userResponse.errorResponse(`User ${+req.params.id} not found`));
                return;
            }
            const isDeleted = await users_1.repository.deleteUser(+req.params.id);
            if (!isDeleted) {
                res.status(401).send(usersResponse_1.userResponse.errorResponse(`User ${+req.params.id} not deleted`));
                return;
            }
            res.status(200).send({
                message: `User ${+req.params.id} deleted`,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).send(usersResponse_1.userResponse.errorResponse(error.message));
            }
        }
    }
    async updateUser(req, res) {
        try {
            const user = await users_1.repository.getUserById(+req.params.id);
            if (!user) {
                res.status(404).send(usersResponse_1.userResponse.errorResponse(`User ${+req.params.id} not found`));
                return;
            }
            const isUpdeted = await users_1.repository.updeteUser(+req.params.id, req.body);
            if (!isUpdeted) {
                res.status(401).send(usersResponse_1.userResponse.errorResponse(`User ${+req.params.id} not updated`));
                return;
            }
            res.status(200);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).send(usersResponse_1.userResponse.errorResponse(error.message));
            }
        }
    }
    async createUser(req, res) {
        try {
            const { email } = req.body;
            const existingUser = await users_1.repository.getUserByEmail(email);
            if (existingUser) {
                res.status(400).send(usersResponse_1.userResponse.errorResponse("User already exists"));
                return;
            }
            const newUser = await users_1.repository.createUser(req.body);
            if (!newUser) {
                res.status(401).send(usersResponse_1.userResponse.errorResponse("User not created"));
                return;
            }
            res.status(201).send(usersResponse_1.userResponse.successResponse(newUser));
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).send(usersResponse_1.userResponse.errorResponse(error.message));
            }
        }
    }
}
exports.userController = new UserController();
