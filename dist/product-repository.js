"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repository = void 0;
const bd_1 = require("./bd/bd");
exports.repository = {
    async getAllUsers() {
        const users = await bd_1.pool.query("SELECT * FROM users");
        return users.rows;
    },
    getProduct(id) {
        return products.find((i) => i.id === id);
    },
    async createUser(body) {
        const newUser = await bd_1.pool.query(`INSERT INTO users (id, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING *`, [3, body.first_name, body.last_name, body.email]);
        return newUser.rows[0];
    },
    async deleteUser(id) {
        const user = await bd_1.pool.query("DELETE FROM users WHERE id = $1", [id]);
        if (user.rowCount === 0) {
            throw new Error("User not found");
        }
        return user;
    },
    updeteProduct(id, title) {
        const currentProduct = products.find((i) => i.id === id);
        if (currentProduct) {
            currentProduct.title = title;
            return true;
        }
        else
            return false;
    },
};
