"use strict";
const DAOUsuarios = require("../models/DAOUsuarios");
const config = require("../config");
const mysql = require("mysql");
// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
// Crear instancia 
const daoU = new DAOUsuarios(pool);

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
//Lo usamos antes de entrar a otra página.
function controlAccesoDatosUsuario(request, response, next) {
    daoU.getUsuario(request.session.currentUser, function (err, usuario) {
        if (err) {
            next(err);
        }
        else {
            response.locals.usuario = usuario;
            next();
        }
    })
}

function controlAccesoExisteId(request, response, next) {
    daoU.getId(request.params.id, function (err, usuario) {
        if (err) {
            next(err);
        }
        else {
            next();
        }
    })
}

function cAPreguntas(request, response, next) {
    response.locals.msg = "Todas las preguntas";
    next();
}

function cAPreguntasSinResponder(request, response, next) {
    response.locals.msg = "Preguntas sin responder";
    next();
}

function cAPreguntasUsuario(request, response, next) {
    response.locals.msg = "Tus preguntas";
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
    controlAccesoDatosUsuario:controlAccesoDatosUsuario,
    controlAccesoExisteId:controlAccesoExisteId,
    cAPreguntas: cAPreguntas,
    cAPreguntasSinResponder: cAPreguntasSinResponder,
    cAPreguntasText: cAPreguntasText,
    cAPreguntasEtiqueta: cAPreguntasEtiqueta,
    cAPreguntasUsuario:cAPreguntasUsuario
}