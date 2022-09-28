import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { bodyLoginValidation, bodyRegisterValidation } from "../middlewares/validationManager.js";

const router = express.Router();

router.post("/register", bodyRegisterValidation, register);
router.post("/login", bodyLoginValidation, login)


export default router;