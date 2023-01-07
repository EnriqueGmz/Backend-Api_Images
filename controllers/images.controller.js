import mysqlConnect from "../database/connectdb.js";
import path from "path";
import * as fs from "fs/promises";

export const getImages = async (req, res) => {
    const fkuser = req.uid;
    try {
        const query = `SELECT * FROM apiimagenes.images where fkuser = ?`;
        mysqlConnect.query(query, [fkuser], async (err, rows, field) => {
            if (err) throw err;
            console.log(rows)
            res.status(200).json(rows);
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: "ko" })
    };
};

export const getImage = async (req, res) => {
    const { idimages } = req.params;
    const fkuser = req.uid;
    try {
        let query = `SELECT * FROM apiimagenes.images where idimages = ?`;
        mysqlConnect.query(query, [idimages], async (err, rows, field) => {
            if (err) throw err;
            console.log(rows[0]);
            if (rows[0] == undefined) {
                res.status(404).json({
                    ok: "ko",
                    msg: "No existe esta imagen"
                });
            } else {
                if (rows[0].fkuser != fkuser) {
                    return res.status(200).json({
                        ok: "ko",
                        msg: "No te pertenece este id"
                    });
                };
                return res.status(200).json(rows[0]);
            };
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ ok: "ko" });
    };
};

export const createImage = async (req, res) => {
    const { title, descriptionImage } = req.body;
    const fkuser = req.uid;
    console.log(req.file?.path);

    try {
        const image = req.file?.path;
        // console.log(req.body)
        const query = `INSERT INTO apiimagenes.images (title, descriptionImage, image, fkuser) values (?, ?, ?, ?)`;
        mysqlConnect.query(query, [title, descriptionImage, image, fkuser], async (err, rows, field) => {
            if (err) throw err;
            res.status(201).json({ ok: "Exito", });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: "ko" });
    };
};

export const deleteImg = async (req, res) => {
    const { idimages } = req.params;
    const fkuser = req.uid;
    try {
        let query = `SELECT * FROM apiimagenes.images WHERE idimages =?`;
        mysqlConnect.query(query, [idimages], async (err, rows, fields) => {
            if (err) throw err;
            if (rows[0] === undefined) {
                return res.status(404).json({
                    ok: "ko",
                    msg: "No existe esta imagen"
                });
            } else {
                if (rows[0].fkuser != fkuser) {
                    return res.status(404).json({
                        ok: "ko",
                        msg: "No te pertenece este id"
                    });
                };
            };

            const { image } = rows[0];
            console.log(path.resolve(`./${image}`));
            fs.unlink(path.resolve("./" + image)).then(() => {
                console.log("Imagen borrada del servidor");
            }).catch((err) => console.error("No existe esta imagen en el servidor"))

            query = `DELETE FROM apiimagenes.images WHERE idimages = ?`;
            mysqlConnect.query(query, [idimages], async (err, rows, fields) => {
                if (err) throw err;

                return res.status(200).json({
                    msg: "Imagen borrada",
                });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: "ko" });
    };
};

export const updateImg = async (req, res) => {
    const { idimages } = req.params;
    const { title, descriptionImage } = req.body;
    const fkuser = req.uid;

    try {
        let query = "SELECT * FROM apiimagenes.images WHERE idimages = ?";
        mysqlConnect.query(query, [idimages], async (err, rows, fields) => {
            if (err) throw err;

            if (rows[0] === undefined) {
                return res.status(404).json({
                    ok: "ko",
                    msg: "No existe esta imagen"
                });
            } else {
                if (rows[0].fkuser != fkuser) {
                    return res.status(404).json({
                        ok: "ko",
                        msg: "No te pertenece este id"
                    });
                };
            };

            query = `UPDATE apiimagenes.images SET title = ?, descriptionImage = ? WHERE idimages = ?`;
            mysqlConnect.query(query, [title, descriptionImage, idimages], (err, rows, fields) => {
                if (err) throw err;
                console.log(rows)
                return res.status(200).json({
                    ok: "Exito",
                });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: "ko" });
    };
};


