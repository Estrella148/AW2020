"use strict";
const modelo = require("../models/DAOUsuarios");
const pool = require("../pool");
let daoUsuario = new modelo(pool.obtenerPool());

//Middleware control de acceso
function controlAcceso(request, response, next) {
    if (request.session.currentUser != undefined) {
        response.locals.userEmail = request.session.currentUser;
        next();
    }
    else {
        response.redirect("/paginaInicial");
    }
}

function cAPreguntas(request, response, next) {
    response.locals.msg = "Todas las preguntas";
    next();
}

function cAPreguntasSinResponder(request, response, next) {
    response.locals.msg = "Preguntas sin responder";
    next();
}

function cAPreguntasText(request, response, next) {
    response.locals.msg = "Resultados de la búsqueda ''" + request.body.buscador+ "''";
    next();
}


function cAPreguntasEtiqueta(request, response, next) {
    response.locals.msg = "Preguntas con la etiqueta ["+request.params.id+"]";
    next();
}

module.exports ={
    controlAcceso: controlAcceso,
    cAPreguntas: cAPreguntas,
    cAPreguntasSinResponder: cAPreguntasSinResponder,
    cAPreguntasText: cAPreguntasText,
    cAPreguntasEtiqueta: cAPreguntasEtiqueta
}