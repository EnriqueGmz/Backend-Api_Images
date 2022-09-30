import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../helpers/tokenManager.js";

export const requireToken = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token)
            return res.status(401).json({
                error: "No existe el token de autorización"
            });

        const { uid } = jwt.verify(token, process.env.jwtSign)
        req.uid = uid;
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({
            ok: "ko",
            error: tokenVerificationErrors[error.message]
        })
    }
}