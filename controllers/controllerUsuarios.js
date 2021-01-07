"use strict";
const DAOUsuarios = require("../models/DAOUsuarios");
const config = require("../config");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const fs = require("fs");
const multer = require("multer");
const multerFactory = multer({ dest: path.join(__dirname, "profile_imgs") });
const MySQLStore = new mysqlSession(session);
const sessionStore = new MySQLStore(config.mysqlConfig);
const middlewareSession = session({
    saveUninitialized: false,
    secret: "estheryalex",
    resave: false,
    store: sessionStore
});

// Crear un servidor Express.js
const app = express();
//Crear middleware para la sesión
app.use(middlewareSession);
// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
// Crear instancia 
const daoU = new DAOUsuarios(pool);

function crearCuenta(request, response, next) {
    let imagen = img_aleatoria();
    let error = false;
    if (request.body.password1 === request.body.password2) {
        if (request.file) {//si se sube fichero
            if (request.file.mimetype === "image/png" || request.file.mimetype === "image/jpeg") {
                imagen = request.file.filename;
            } else {
                fs.unlink(request.file.path, function (err) {//para eliminar el archivo cuando hay un error en el registro
                    if (err) {
                        next(err500(err, request, response));
                    }
                });
                error = true;
                response.status(200);
                response.render("crearCuenta", { errorMsg: "La imagen no tiene el formato correcto, no es .jpg o .png" });
            }
        }
        if (!error) {
            daoU.leerCorreoUsuario(request.body.email, function (err, result) {
                if (err) {
                    next(err);
                }
                else {
                    if (result != undefined) {
                        response.status(200);
                        response.render("crearCuenta", { errorMsg: "El usuario ya existe" });
                    } else {
                        daoU.insertarUsuario(request.body.email, request.body.password1, request.body.name, imagen, function (err, request) {
                            if (err) {
                                next(err);
                            }
                            else {
                                response.redirect("/paginaInicial");
                            }
                        });
                    }
                }
            });
        }

    } else {
        response.status(200);
        response.render("crearCuenta", { errorMsg: "Las contraseñas no coinciden" });
    }
}

function img_aleatoria() {
    let array = ["estandar1.jpg", "estandar2.png", "estandar3.jpg"];
    return array[Math.floor(Math.random() * 3)];
}

function logearse(request, response, next) {
    daoU.usuarioCorrecto(request.body.email, request.body.password, function (err, result) {
        if (err) {
            next(err);
        }
        else {
            if (result) {
                request.session.currentUser = request.body.email;
                response.redirect("/paginaPrincipal");
            }
            else {
                response.render("paginaInicial", { errorMsg: "Dirección de correo y/o contraseña no válidos" });
            }
        }
    });
}

function paginaPrincipal(request, response, next) {
    daoU.getUsuario(request.session.currentUser, function (err, usuario) {
        if (err) {
            next(err);
        }
        else {
            response.status(200);
            response.render("paginaPrincipal", { usuario: usuario });
        }
    });
}

function imagenPerfil(request, response, next) {
    if (request.params.id) {
        response.sendFile(path.join(__dirname, "profile_imgs", request.params.id));
    }
    daoU.getUserImageName(request.session.currentUser, function (err, image) {
        if (err) {
            next(err);
        }
        else {
            response.sendFile(path.join(__dirname, "profile_imgs", image));
        }
    });
}


function buscarUsuario(request, response, next) {
    daoU.MostrarTodosUsuario(function (err, usersList) {
        if (err) {
            next(err);
        }
        else {
            response.status(200);
            response.render("busquedaUsuario", { usersList: usersList });
        }
    })
}

//Middleware que nos proporciona los datos del usuario en todas las páginas.
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

//Perfil usuario.
function datosUsuario(request, response, next) {
    daoU.getPerfilUsuario(request.params.id, function (err, u) {
        if (err) {
            next(err);
        }
        else {
            daoU.getMedallaOro(request.params.id, function (err, oros, cantidadO) {
                if (err) {
                    next(err);
                }
                else {
                    daoU.getMedallaPlata(request.params.id, function (err, platas, cantidadP) {
                        if (err) {
                            next(err);
                        }
                        else {
                            daoU.getMedallaBronce(request.params.id, function (err, bronces, cantidadB) {
                                if (err) {
                                    next(err);
                                }
                                else {
                                    response.status(200);
                                    response.render("perfilUsuario", { u: u, bronces: bronces, cantidadB: cantidadB, platas: platas, cantidadP: cantidadP, oros: oros, cantidadO: cantidadO });
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

function filtroUsuario(request, response, next) {
    daoU.mostrarUsuariosText(request.body.buscadorUsuario, function (err, usersList) {
        if (err) {
            next(err);
        }
        else {
            response.status(200);
            response.render("filtrarUsuario", { usersList: usersList});
        }
    })
}

module.exports = {
    crearCuenta: crearCuenta,
    logearse: logearse,
    paginaPrincipal: paginaPrincipal,
    imagenPerfil: imagenPerfil,
    buscarUsuario: buscarUsuario,
    controlAccesoDatosUsuario: controlAccesoDatosUsuario,
    datosUsuario: datosUsuario,
    filtroUsuario:filtroUsuario
};

