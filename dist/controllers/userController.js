"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const users_1 = require("../models/users");
class UserController {
    async getAllUsers(req, res) {
        const products = await users_1.repository.getAllUsers();
        res.send(products);
    }
    async getUserById(req, res) {
        try {
            const product = await users_1.repository.getUserById(+req.params.id);
            res.send(product);
        }
        catch (error) {
            res.status(404).send({
                message: `User ${+req.params.id} not found`,
            });
        }
    }
    async deleteUser(req, res) {
        try {
            await users_1.repository.deleteUser(+req.params.id);
            res.status(200).send({
                message: `User ${+req.params.id} deleted`,
            });
        }
        catch (error) {
            res.status(404).send({
                message: `User ${+req.params.id} not found`,
            });
        }
    }
    async updateUser(req, res) {
        try {
            const isUpdeted = await users_1.repository.updeteUser(+req.params.id, req.body);
            res.status(200).send(isUpdeted);
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === "User not found" || error.message === "User not updated") {
                    res.status(404).send({
                        message: error.message,
                    });
                }
                else {
                    res.status(500).send({
                        message: error.message,
                    });
                }
            }
        }
    }
    async createUser(req, res) {
        try {
            const newProducts = await users_1.repository.createUser(req.body);
            res.status(201).send(newProducts);
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === "User not created" || error.message === "User already exists") {
                    res.status(400).send({
                        message: error.message,
                    });
                }
                else {
                    res.status(500).send({
                        message: error.message,
                    });
                }
            }
        }
    }
}
exports.userController = new UserController();
