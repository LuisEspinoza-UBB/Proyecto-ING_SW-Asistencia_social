"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");
/** Instancia del enrutador */
const router = express.Router();

const { getFile, uploadFile } = require('../controllers/archivo.controller');

// Define las rutas para los usuarios
router.get("/", getFile);
router.post("/", uploadFile);

// Exporta el enrutador
module.exports = router;
