"use strict";
const { Schema, model } = require('mongoose');

// Función para definir la estructura de validación para los campos
const campoRequerido = {
    type: String,
    required: [true, 'Este campo es obligatorio']
};

const espacioRequerido = {
    type: Number,
    required: [true, 'Este campo es obligatorio']
};

const FichaProteccionSocialSchema = Schema({
    nombre: campoRequerido,
    run: campoRequerido,
    edad: espacioRequerido,
    telefono: espacioRequerido,
    estadoCivil: campoRequerido,
    direccion: {
        calle: campoRequerido,
        comuna: campoRequerido,
        ciudad: campoRequerido,
        region: campoRequerido,
        numeracion: espacioRequerido,
        dpto: espacioRequerido,
        block: campoRequerido,
        casa: campoRequerido,
        km_sitio: campoRequerido,
        referencia: campoRequerido,
        domicilio: {
            cantidad_piezas: espacioRequerido,
            banos: espacioRequerido,
            estadocasa: campoRequerido,  //dueño, arrendatario
        },
    },
    personasEnHogar: [
        {
            nombre: campoRequerido,
            edad: espacioRequerido,
            estadoCivil: campoRequerido
        }
    ],
    vivienda: campoRequerido,
    ingresos: campoRequerido,
    miembrosFamilia: espacioRequerido
});



module.exports = model('FichaProteccionSocial', FichaProteccionSocialSchema);
