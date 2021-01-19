"use strict";
const express = require("express");
const routerP=express.Router();
const controllerP= require("../controllers/controllerPreguntas")
const middlewares = require("../middleware/middlewares");


routerP.get("/preguntasUsuario",middlewares.controlAcceso, middlewares.controlAccesoDatosUsuario, middlewares.cAPreguntasUsuario,controllerP.mostrarPreguntasUsuario);
//Mostrar todas las preguntas
routerP.get("/preguntas", middlewares.controlAcceso, middlewares.controlAccesoDatosUsuario, middlewares.cAPreguntas, controllerP.mostrarTodas);
   
//Formular Pregunta
routerP.get("/formularPregunta", middlewares.controlAcceso, middlewares.controlAccesoDatosUsuario,controllerP.getFormularPregunta);

routerP.post("/formularPregunta", middlewares.controlAccesoDatosUsuario,controllerP.formularPregunta);

//Filtrar por texto
routerP.post("/preguntasText", middlewares.controlAcceso, middlewares.controlAccesoDatosUsuario, middlewares.cAPreguntasText, controllerP.filtroTexto);

//Filtrar por etiqueta
routerP.get("/preguntasEtiqueta/:id", middlewares.controlAcceso, middlewares.controlAccesoDatosUsuario, middlewares.cAPreguntasEtiqueta,controllerP.filtroEtiqueta);
routerP.post("/preguntasEtiqueta/preguntasText", middlewares.controlAcceso, middlewares.controlAccesoDatosUsuario, middlewares.cAPreguntasText,controllerP.filtroTexto);

//Preguntas sin responder
routerP.get("/preguntasSinResponder", middlewares.controlAcceso, middlewares.controlAccesoDatosUsuario, middlewares.cAPreguntasSinResponder, controllerP.mostrarPreguntasSinResponder);

//Info Pregunta
routerP.get("/infoPregunta/:id", middlewares.controlAcceso, middlewares.controlAccesoDatosUsuario, controllerP.infoP);

//Formular respuesta
routerP.post("/infoPregunta",middlewares.controlAcceso, middlewares.controlAccesoDatosUsuario, controllerP.formularRespuesta);

//Votos
routerP.post("/votosPregunta",middlewares.controlAcceso, middlewares.controlAccesoDatosUsuario, controllerP.actualizarVotos);
routerP.post("/votosRespuesta",middlewares.controlAcceso, middlewares.controlAccesoDatosUsuario, controllerP.actualizarVotosRespuesta);


module.exports = routerP;