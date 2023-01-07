import mysqlConnect from "../database/connectdb.js";
import { encryptPassword } from "../libs/bcrypt.js";
import bcrypt from "bcryptjs";
import { generateRefreshToken, generateToken } from "../helpers/tokenManager.js";

export const register = async (req, res) => {
    const { username, surname, email, password } = req.body
    console.log(req.body);

    try {
        let query = `SELECT email from apiimagenes.users where email = ?`;
        mysqlConnect.query(query, [email], async (err, rows, field) => {
            if (err) throw err;

            if (rows.length == 0) {

                const hashPassword = await encryptPassword(password);

                query = `INSERT INTO apiimagenes.users (username, surname, email, password) values (?, ?, ?, ?)`;
                mysqlConnect.query(query, [username, surname, email, hashPassword], async (err, rows, fields) => {
                    if (err) throw err;
                    res.status(201).json({ ok: 'exito' })
                })
            } else {
                res.status(400).json({
                    ok: 'ko',
                    msg: 'El usuario ya existe'
                })
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: "ko" })
    }
}

export const login = (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    try {
        let query = `SELECT  * from apiimagenes.users where email = ?`;
        mysqlConnect.query(query, [email], async (err, rows, field) => {
            if (err) throw err;

            if (rows.length > 0) {
                const validPassword = await bcrypt.compare(password, rows[0].password)
                if (validPassword) {
                    // Generando JWT
                    const { token, expiresIn } = generateToken(rows[0].idusers);
                    generateRefreshToken(rows[0].idusers, res);
                    res.status(201).json({
                        ok: "exito",
                        token,
                        expiresIn
                    })
                } else {
                    res.status(400).json({
                        ok: "ko",
                        msg: "Credenciales invalidas"
                    })
                }
            } else {
                res.status(403).json({ msg: "No existe el usuario" });
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: "ko" })
    }
};

export const infoUser = (req, res) => {
    try {
        let query = `SELECT * from apiimagenes.users where idusers = ?`;
        mysqlConnect.query(query, [req.uid], async (err, rows, field) => {
            if (err) throw err;
            console.log(req.params)
            res.status(200).json({
                id: rows[0].idusers,
                name: rows[0].username,
                surname: rows[0].surname,
                email: rows[0].email
            })
            console.log(rows[0])
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ ok: "ko" });
    }
};

export const refresh = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);

        return res.json({ token, expiresIn })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: "ko" })
    }
};

export const logOut = (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ ok: "Exito" });
}


