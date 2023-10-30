"use strict";

// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de autenticación */
const fichaController = require("../controllers/ficha.controller");

/** Instancia del enrutador */
const router = express.Router();

// ver si esta bueno esto
router.get("/", fichaController.getFicha);
router.post('/', fichaController.postFicha);

module.exports = router;