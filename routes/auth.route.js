import express from "express";
import { infoUsers, login, register } from "../controllers/auth.controller.js";
import { bodyLoginValidation, bodyRegisterValidation } from "../middlewares/validationManager.js";
import { requireToken } from "../middlewares/validatorToken.js";

const router = express.Router();

router.post("/register", bodyRegisterValidation, register);
router.post("/login", bodyLoginValidation, login)
router.get("/", requireToken, infoUsers)

export default router;