import bcrypt from "bcryptjs";

export const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return hash
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash del password")
    }
}

export const comparePassword = async (password, savedPassword) => {
    await bcrypt.compare(password, savedPassword);
}