"use strict";
const express = require("express");
const routerP=express.Router();
const controllerU= require("../controllers/controllerUsuarios")
const controllerP= require("../controllers/controllerPreguntas")
const middlewares = require("../middleware/middlewares");

//Mostrar todas las preguntas
routerP.get("/preguntas", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, middlewares.cAPreguntas, controllerP.mostrarTodas);
   
//Formular Pregunta
routerP.get("/formularPregunta", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario,controllerP.getFormularPregunta);

routerP.post("/formularPregunta", controllerU.controlAccesoDatosUsuario,controllerP.formularPregunta);

//Filtrar por texto
routerP.post("/preguntasText", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, middlewares.cAPreguntasText, controllerP.filtroTexto);

//Filtrar por etiqueta
routerP.get("/preguntasEtiqueta/:id", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, middlewares.cAPreguntasEtiqueta,controllerP.filtroEtiqueta);
routerP.post("/preguntasEtiqueta/preguntasText", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, middlewares.cAPreguntasText,controllerP.filtroTexto);

//Preguntas sin responder
routerP.get("/preguntasSinResponder", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, middlewares.cAPreguntasSinResponder, controllerP.mostrarPreguntasSinResponder);

//Info Pregunta
routerP.get("/infoPregunta/:id", middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, controllerP.infoP);

//Formular respuesta
routerP.post("/infoPregunta",middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, controllerP.formularRespuesta);

//Votos
routerP.post("/votosPregunta",middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, controllerP.actualizarVotos);
routerP.post("/votosRespuesta",middlewares.controlAcceso, controllerU.controlAccesoDatosUsuario, controllerP.actualizarVotosRespuesta);


module.exports = routerP;