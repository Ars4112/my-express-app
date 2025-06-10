"use strict";
// import { pool } from "../bd/bd";
// export const repository = {
// 	async getAllUsers() {
// 		const users = await pool.query("SELECT * FROM users");
// 		return users.rows;
// 	},
// 	async getUser(id: number) {
// 		const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
// 		if (user.rowCount !== 0) {
// 			return user.rows[0];
// 		} else {
// 			throw new Error("User not found");
// 		}
// 	},
// 	async createUser(body: { first_name: string; last_name: string; email: string, password: string }) {
// 		const users = await pool.query("SELECT * FROM users WHERE email = $1", [body.email]);
// 		if (users.rowCount !== 0) {
// 			throw new Error("User already exists");
// 		}
// 		const newUser = await pool.query(
// 			`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
// 			[body.first_name, body.last_name, body.email, body.password]
// 		);
// 		if (newUser.rowCount === 0) {
// 			throw new Error("User not created");
// 		}
// 		return newUser.rows[0];
// 	},
// 	async deleteUser(id: number) {
// 		const user = await pool.query("DELETE FROM users WHERE id = $1", [id]);
// 		if (user.rowCount === 0) {
// 			throw new Error("User not found");
// 		}
// 		return user;
// 	},
// 	async updeteUser(id: number, body: { first_name: string; last_name: string; email: string }) {
// 		const currentProduct = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
// 		if (currentProduct.rowCount === 0) {
// 			throw new Error("User not found");
// 		}
// 		const updatedUser = await pool.query(
// 			`UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *`,
// 			[body.first_name, body.last_name, body.email, id]
// 		);
// 		if (updatedUser.rowCount === 0) {
// 			throw new Error("User not updated");
// 		}
// 		return updatedUser.rows[0];
// 	},
// };
