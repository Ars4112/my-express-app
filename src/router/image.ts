import { Router } from "express";
import { imageController } from "../controllers/imageController";

export const image = Router();

image.get("/:id", imageController.getImage);