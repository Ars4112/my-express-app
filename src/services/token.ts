import jwt, { SignOptions } from "jsonwebtoken";
import { ITokenPayload, ITokens } from "../types/token";
import { tokenBlacklist } from "../models/tokenBlackList";
import { Response } from "express";

class TokenService {
	private readonly accessTokenSecret: string;
	private readonly refreshTokenSecret: string;
	private readonly accessTokenExpiresIn: string;
	private readonly refreshTokenExpiresIn: string;

	constructor() {
		this.accessTokenSecret = process.env.JWT_SECRET!;
		this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET!;
		this.accessTokenExpiresIn = process.env.JWT_EXPIRES_IN || "15m";
		this.refreshTokenExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "7d";
	}

	async generateTokens(payload: ITokenPayload): Promise<ITokens> {
		const accessToken = jwt.sign(payload, this.accessTokenSecret, {
			expiresIn: this.accessTokenExpiresIn,
		} as SignOptions);

		const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
			expiresIn: this.refreshTokenExpiresIn,
		} as SignOptions);

		return { accessToken, refresh_token: refreshToken };
	}

	async validateAccessToken(token: string): Promise<ITokenPayload | null> {
		try {
			return jwt.verify(token, this.accessTokenSecret) as ITokenPayload;
		} catch (e) {
			return null;
		}
	}

	async validateRefreshToken(token: string): Promise<ITokenPayload | any> {
		try {
			const isBlacklisted = await tokenBlacklist.isBlacklisted(token);
			if (isBlacklisted) {
				return null;
			}

			const payload = jwt.verify(token, this.refreshTokenSecret) as ITokenPayload;

			return payload;
		} catch (e) {
			if (e instanceof jwt.TokenExpiredError) {
				return { expired: true };
			}
			return null;
		}
	}

	async invalidateRefreshToken(token: string): Promise<void> {
		try {
			const payload = (await jwt.decode(token)) as ITokenPayload & { exp?: number };
			if (!payload?.exp) return;

			const expiresAt = new Date(payload.exp * 1000);
			await tokenBlacklist.addToBlacklist({ user_id: payload.id, refresh_token: token, expires_at: expiresAt });
		} catch (e) {
			console.error("Failed to invalidate token:", e);
		}
	}

	async setRefreshCookie(res: Response, token: string) {
		res.cookie("refreshToken", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
	}

	async clearRefreshCookie(res: Response) {
		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});
	}
}

export const tokenService = new TokenService();
