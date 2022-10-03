import express from "express";
import mysqlConnect from "../database/connectdb.js";

export const getImages = (req, res) => {

}

export const createImage = (req, res) => {
    const { title, descriptionImage } = req.body;
    const fkuser = req.uid;
    console.log(req.file.filename)

    try {
        let image = req.file.filename,
            query = `INSERT INTO apiimagenes.images (title, descriptionImage, image, fkuser) values (?, ?, ?, ?)`;
        mysqlConnect.query(query, [title, descriptionImage, image, fkuser], (err, rows, field) => {
            if (err) throw err;
            res.status(201).json({ ok: "Exito" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: "ko" })
    }

}
