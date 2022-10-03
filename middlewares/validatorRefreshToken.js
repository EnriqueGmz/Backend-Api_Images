import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../helpers/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;

        if (!refreshTokenCookie)
            return res.status(401).json({ error: "No existe el token" });

        const { uid } = jwt.verify(refreshTokenCookie, process.env.jwtRefresh);
        req.uid = uid;
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: "ko",
            error: tokenVerificationErrors[error.message]
        });
    }
}