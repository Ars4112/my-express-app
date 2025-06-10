"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repository = void 0;
const bd_1 = require("./bd/bd");
exports.repository = {
    async getAllUsers() {
        const users = await bd_1.pool.query("SELECT * FROM users");
        return users.rows;
    },
    async getUser(id) {
        const user = await bd_1.pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (user.rowCount !== 0) {
            return user.rows[0];
        }
        else {
            throw new Error("User not found");
        }
    },
    async createUser(body) {
        const users = await bd_1.pool.query("SELECT * FROM users WHERE email = $1", [body.email]);
        if (users.rowCount !== 0) {
            throw new Error("User already exists");
        }
        const newUser = await bd_1.pool.query(`INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *`, [body.first_name, body.last_name, body.email]);
        if (newUser.rowCount === 0) {
            throw new Error("User not created");
        }
        return newUser.rows[0];
    },
    async deleteUser(id) {
        const user = await bd_1.pool.query("DELETE FROM users WHERE id = $1", [id]);
        if (user.rowCount === 0) {
            throw new Error("User not found");
        }
        return user;
    },
    async updeteUser(id, body) {
        const currentProduct = await bd_1.pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (currentProduct.rowCount === 0) {
            throw new Error("User not found");
        }
        const updatedUser = await bd_1.pool.query(`UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *`, [body.first_name, body.last_name, body.email, id]);
        if (updatedUser.rowCount === 0) {
            throw new Error("User not updated");
        }
        return updatedUser.rows[0];
    },
};
