import express from "express";
import { infoUsers, login, refreshToken, register } from "../controllers/auth.controller.js";
import { bodyLoginValidation, bodyRegisterValidation } from "../middlewares/validationManager.js";
import { requireRefreshToken } from "../middlewares/validatorRefreshToken.js";
import { requireToken } from "../middlewares/validatorToken.js";

const router = express.Router();

router.post("/register", bodyRegisterValidation, register);
router.post("/login", bodyLoginValidation, login);
router.get("/protected", requireToken, infoUsers);
router.get("/refresh", requireRefreshToken, refreshToken)

export default router;