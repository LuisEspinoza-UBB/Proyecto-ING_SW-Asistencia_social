"use strict";

const FichaProteccionSocial = require("../models/ficha.model") ;

const getFicha = async (req, res) => {
    const fichas = await FichaProteccionSocial.find();
    res.json({ fichas });
};

const postFicha = async (req, res) => {
    const saveFicha = new FichaProteccionSocial(req.body);

    try {
        await saveFicha.save();
        res.json({ ficha: saveFicha });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error al guardar ficha.' });
    }
};

module.exports = {
    getFicha,
    postFicha,
};
