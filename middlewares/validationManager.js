import { body, validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }

    next();
}

export const bodyRegisterValidation = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 caracteres")
        .trim()
        .isLength({ min: 6 })
        .custom(),
    validationResultExpress
]