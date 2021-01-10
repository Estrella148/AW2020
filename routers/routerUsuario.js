"use strict";
const express = require("express");
const routerU=express.Router()
const controllerU= require("../controllers/controllerUsuarios")
const multer = require("multer");
const path = require("path");
const multerFactory = multer({ dest: path.join(__dirname, "../controllers/profile_imgs") });
const middlewares = require("../middleware/middlewares");


routerU.post("/paginaInicial", controllerU.logearse);

//Pagina principal
routerU.get("/paginaPrincipal", middlewares.controlAcceso, controllerU.paginaPrincipal);
//Perfil Usuario
routerU.get("/perfilUsuario/:id", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, controllerU.datosUsuario);
//Insertar usuario
routerU.post("/crearCuenta", multerFactory.single("img"), controllerU.crearCuenta);
//Crear Cuenta
routerU.get("/crearCuenta", controllerU.getCrearCuenta);
//Imagenes de Perfil
routerU.get("/imagenUsuario/:id?", middlewares.controlAcceso, controllerU.imagenPerfil);
//Buscar Usuario
routerU.get("/busquedaUsuario", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, controllerU.buscarUsuario);
//Filtro Usuarios
routerU.post("/filtrarUsuario", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, middlewares.cAPreguntasText, controllerU.filtroUsuario);
//Desconectar
routerU.get("/cerrarSesion", middlewares.controlAcceso,controllerU.cerrarSesion);

module.exports = routerU;