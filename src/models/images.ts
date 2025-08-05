import { pool } from "../bd/bd";
import { IImage, IImageRepository, IImageType } from "../types/image";

 class Images {
	async getImageUser(id: number, image_type: IImageType): Promise<IImage> {
		const image = await pool.query("SELECT * FROM user_image WHERE user_id = $1 AND image_type = $2", [id, image_type]);

		return image.rows[0] || null;
	}

	async saveImageUser(image: IImageRepository): Promise<IImage> {
		const { user_id, bucket_key, mime_type, file_size, width, height, image_type } = image;

		const images = await pool.query(
			"INSERT INTO user_image (user_id, bucket_key, mime_type, file_size, width, height, image_type) VALUES ($1, $2, $3, $4, $5,$6, $7) RETURNING *",
			[user_id, bucket_key, mime_type, file_size, width, height, image_type]
		);
		return images.rows[0];
	}

	async deleteImageUser(id: number, image_type: IImageType): Promise<boolean> {
		const image = await pool.query("DELETE FROM user_image WHERE user_id = $1 AND image_type = $2", [id, image_type]);

		return image.rowCount !== 0;
	}

	async updateImageUser(id: number, image: IImageRepository): Promise<boolean> {
		const { bucket_key, mime_type, file_size, width, height, image_type } = image;
		const updatedImage = await pool.query(
			`UPDATE user_image SET bucket_key = $1, mime_type = $2, file_size = $3, width = $4, height = $5, image_type = $6 WHERE user_id = $7 AND image_type = $8`,
			[bucket_key, mime_type, file_size, width, height, image_type, id, image_type]
		);
		return updatedImage.rowCount !== 0;
	}
}

export const imagesModule = new Images();
