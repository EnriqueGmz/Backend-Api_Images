import mysqlConnect from "../database/connectdb.js";
import { comparePassword, encryptPassword } from "../libs/bcrypt.js";

export const register = async (req, res) => {
    const { username, surname, email, password } = req.body
    console.log(req.body);

    try {
        let query = `select email from apiimagenes.users where email = ?`;
        mysqlConnect.query(query, [email], async (err, rows, field) => {
            if (err) throw err;

            if (rows.length == 0) {

                const hashPassword = await encryptPassword(password);

                query = `insert into apiimagenes.users (username, surname, email, password) values (?, ?, ?, ?)`;
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
    console.log(req.body)
    res.json({ ok: "Login" })
}

