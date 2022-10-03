import express from "express";
import multer from "../libs/multer.js"
import { createImage, getImages, } from "../controllers/images.controller.js";
import { requireToken } from "../middlewares/validatorToken.js";

const router = express.Router();

router.get("/", requireToken, getImages);
router.post("/", requireToken, multer.single("image"), createImage);

export default router;