import mysqlConnect from "../database/connectdb.js";

export const getImages = async (req, res) => {
    const fkuser = req.uid;
    try {
        const query = `SELECT * FROM apiimagenes.images where fkuser = ?`;
        mysqlConnect.query(query, [fkuser], async (err, rows, field) => {
            if (err) throw err;
            res.status(200).json(rows);
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: "ko" })
    }
};

export const getImage = async (req, res) => {

    try {
        const { idimages } = req.params;
        let query = `SELECT *  from apiimagenes.images where idimages= ?`;
        mysqlConnect.query(query, [idimages], async (err, rows, field) => {
            if (err) throw err;
            res.status(200).json(rows)
            console.log(rows)
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ ok: "ko" });
    }
};

export const createImage = async (req, res) => {
    const { title, descriptionImage } = req.body;
    const fkuser = req.uid;
    console.log(req.file.filename)

    try {
        const image = req.file.filename;
        const query = `INSERT INTO apiimagenes.images (title, descriptionImage, image, fkuser) values (?, ?, ?, ?)`;
        mysqlConnect.query(query, [title, descriptionImage, image, fkuser], async (err, rows, field) => {
            if (err) throw err;
            res.status(201).json({ ok: "Exito", })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: "ko" })
    }
}
