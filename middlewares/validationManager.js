import { body, validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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
        .custom(
            (value, { req }) => {
                if (value !== req.body.confirmPassword) {
                    throw new Error("Las contraseñas no coinciden")
                }
                return value
            }
        ),
    validationResultExpress
]

export const bodyLoginValidation = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 }),
    validationResultExpress
]