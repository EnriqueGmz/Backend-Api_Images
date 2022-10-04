import express from "express";
import mysqlConnect from "../database/connectdb.js";

export const getImages = (req, res) => {
    try {

        let query = `SELECT * FROM apiimagenes.images where fkuser = ?`;
        mysqlConnect.query(query, [req.uid], async (err, rows, field) => {
            if (err) throw err;
            res.status(200).json(rows);
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: "ko" })
    }
}


export const createImage = async (req, res) => {
    const { title, descriptionImage } = req.body;
    const fkuser = req.uid;
    console.log(req.file.filename)

    try {
        let image = req.file.filename;
        let query = `INSERT INTO apiimagenes.images (title, descriptionImage, image, fkuser) values (?, ?, ?, ?)`;
        mysqlConnect.query(query, [title, descriptionImage, image, fkuser], async (err, rows, field) => {
            if (err) throw err;
            res.status(201).json({ ok: "Exito" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: "ko" })
    }
}
