import { IUser, IUserCreate, IUserUpdate } from "../types/user";
import { pool } from "../bd/bd";
import bcrypt from "bcrypt";

class Users {
	async getAllUsers(): Promise<IUser[]> {
		const users = await pool.query("SELECT * FROM users");

		return users.rows;
	}

	async getUserByEmail(email: string): Promise<IUser | null> {
		const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

		return user.rows[0] || null;
	}

	async getUserById(id: number): Promise<IUser | null> {
		const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

		return user.rows[0] || null;
	}

	async createUser(body: IUserCreate): Promise<IUser> {
		const hashedPassword = await bcrypt.hash(body.password, 10);
		const newUser = await pool.query(
			`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
			[body.first_name, body.last_name, body.email, hashedPassword]
		);

		return newUser.rows[0];
	}

	async deleteUser(id: number): Promise<boolean> {
		const user = await pool.query("DELETE FROM users WHERE id = $1", [id]);

		return user.rowCount !== 0;
	}

	async updeteUser(id: number, body: IUserUpdate) : Promise<boolean> {
		const updatedUser = await pool.query(`UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4`, [
			body.first_name,
			body.last_name,
			body.email,
			id,
		]);

		return updatedUser.rowCount !== 0;
	}
}

export const repository = new Users();
