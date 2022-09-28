import express from "express";
import { register } from "../controllers/auth.controller.js";
import { bodyRegisterValidation } from "../middlewares/validationManager.js";

const router = express.Router();

router.post("/register", bodyRegisterValidation, register);


export default router;