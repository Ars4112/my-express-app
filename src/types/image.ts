export type IImage = {
	id: number;
	user_id: number;
	bucket_key: string;
	image_type: IImageType;
	mime_type: string;
	file_size: number;
	created_at: Date;
	updated_at: Date;
	width: number;
	height: number;
};

export type IImageRepository = Omit<IImage, "id" | "created_at" | "updated_at">;

export type IImageType = "avatar" | "post" | "story";
