import express from "express";
import { infoUser, login, logOut, refresh, register } from "../controllers/auth.controller.js";
import { bodyLoginValidation, bodyRegisterValidation } from "../middlewares/validationManager.js";
import { requireRefreshToken } from "../middlewares/validatorRefreshToken.js";
import { requireToken } from "../middlewares/validatorToken.js";

const router = express.Router();

router.post("/register", bodyRegisterValidation, register);
router.post("/login", bodyLoginValidation, login);
router.get("/protected", requireToken, infoUser);
router.post("/refresh", requireRefreshToken, refresh);
router.post("/logout", logOut)

export default router;