import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
    const expiresIn = "24h";

    try {
        const token = jwt.sign({ uid }, process.env.jwtSign, { expiresIn });
        return { token, expiresIn };
    } catch (error) {
        console.log(error)
    }
}

