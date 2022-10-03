import express from "express";

export const getImages = (req, res) => {

}

export const createImage = (req, res) => {
    console.log("Foto guardada"),
        console.log(req.body);
    return res.json({
        message: "Foto guardada"
    })
}