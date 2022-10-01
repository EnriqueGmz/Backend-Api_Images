import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
    const expiresIn = 60 * 15;
    const payload = { uid };
    try {
        const token = jwt.sign(payload, process.env.jwtSign, { expiresIn });
        return { token, expiresIn };

    } catch (error) {
        console.log(error);
    }
}

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    const payload = { uid };

    try {
        const refreshToken = jwt.sign(payload, process.env.jwtRefresh, { expiresIn });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000),
        });
    } catch (error) {
        console.log(error)
    }
}

export const tokenVerificationErrors = {
    "invalid signature": "la firma del JWT no es válida",
    "jwt expired": "La sesión ha expirado",
    "invalid token": "Token no válido",
    "jwt malformed": "JWT formato no válido"
}

