import { body, checkSchema, validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

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
];

export const bodyLoginValidation = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 }),
    validationResultExpress
];

export const bodyImageValidator = [
    body("title", "El título de la imagen es obligatorio").not().isEmpty(),
    body("descriptionImage", "La descripción de la iamgen es obligatoria").not().isEmpty(),
    checkSchema({
        "image": {
            custom: {
                options: (value, { req, path }) => !!req.file['path'],
                errorMessage: 'La imagen no es valida'
            }
        },
    }),
    validationResultExpress
];