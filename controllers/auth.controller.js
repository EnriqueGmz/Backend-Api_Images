import mysqlConnect from "../database/connectdb.js";
import { encryptPassword } from "../libs/bcrypt.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/tokenManager.js";

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

                    await res.status(201).json({ ok: 'exito' })
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
        res.status(500).json({ ok: "ko" })
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
                    const { token, expiresIn } = generateToken(rows[0].idusers);
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
                res.status(400).json({ msg: "No existe el usuario" });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: "ko" })
    }



}

