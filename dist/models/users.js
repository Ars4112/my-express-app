"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repository = void 0;
const bd_1 = require("../bd/bd");
const bcrypt_1 = __importDefault(require("bcrypt"));
class Users {
    async getAllUsers() {
        const users = await bd_1.pool.query("SELECT * FROM users");
        return users.rows;
    }
    async getUserByEmail(email) {
        const user = await bd_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return user.rows[0] || null;
    }
    async getUserById(id) {
        const user = await bd_1.pool.query("SELECT * FROM users WHERE id = $1", [id]);
        return user.rows[0] || null;
    }
    async createUser(body) {
        const hashedPassword = await bcrypt_1.default.hash(body.password, 10);
        const newUser = await bd_1.pool.query(`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`, [body.first_name, body.last_name, body.email, hashedPassword]);
        return newUser.rows[0];
    }
    async deleteUser(id) {
        const user = await bd_1.pool.query("DELETE FROM users WHERE id = $1", [id]);
        return user.rowCount !== 0;
    }
    async updeteUser(id, body) {
        const updatedUser = await bd_1.pool.query(`UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4`, [
            body.first_name,
            body.last_name,
            body.email,
            id,
        ]);
        return updatedUser.rowCount !== 0;
    }
}
exports.repository = new Users();
