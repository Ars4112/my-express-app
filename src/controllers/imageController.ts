import { Response, Request } from "express";
import { IImageRepository, IImageType } from "../types/image";
import { imagesModule } from "../models/images";
class ImageController {
	async uploadImage(req: Request<IImageRepository>, res: Response) {
		try {
			const file = req;
			if (!file) {
				res.status(400).json({ message: "No file uploaded" });
				return;
			}
			// const image = await imagesModule.saveImageUser(file);

			// res.json(image);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({
					message: error.message,
				});
			}
		}
	}
	async getImage(req: Request, res: Response) {
		try {
			const user_id = Number(req.params.id);

			const { image_type } = req.query;

			if (!image_type) {
				res.status(400).json({
					message: "Image type is required",
				});
				return;
			}
			// res.send({ag: req.headers.authorization});
			const image = await imagesModule.getImageUser(user_id, image_type as IImageType);
			if (!image) {
				res.status(404).json({
					message: "Image not found",
				});
				return;
			}
			res.json(image);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({
					message: error.message,
				});
			}
		}
	}
}

export const imageController = new ImageController();
