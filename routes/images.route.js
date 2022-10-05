import express from "express";
import { createImage, getImage, getImages, } from "../controllers/images.controller.js";
import { requireToken } from "../middlewares/validatorToken.js";
import { bodyImageValidator } from "../middlewares/validationManager.js";
import uploadFile from "../libs/multer.js";


const router = express.Router();

router.get("/", requireToken, getImages);
router.get("/:idimages", requireToken, getImage);
router.post("/", requireToken, uploadFile.single("image"), bodyImageValidator, createImage);

export default router;