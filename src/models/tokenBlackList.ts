import { ITokenPayloadAddRefresh } from "../types/token";
import { pool } from "../bd/bd";
class TokenBlacklist {
	async addToBlacklist(payload : ITokenPayloadAddRefresh): Promise<void> {
		const { refresh_token, expires_at, user_id } = payload;
		const query = `
        INSERT INTO token_blacklist(refresh_token, expires_at, user_id) 
        VALUES($1, $2, $3)
      `;
		await pool.query(query, [refresh_token, expires_at, user_id]);
	}

	async isBlacklisted(token: string): Promise<boolean> {
		const query = `
        SELECT * FROM token_blacklist 
        WHERE refresh_token = $1 AND expires_at > NOW()
        LIMIT 1
      `;
		const { rows } = await pool.query(query, [token]);
		return rows.length > 0;
	}

	async cleanupExpired(): Promise<void> {
		await pool.query("DELETE FROM token_blacklist WHERE expires_at <= NOW()");
	}
}

export const tokenBlacklist = new TokenBlacklist();
