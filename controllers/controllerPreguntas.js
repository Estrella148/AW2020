"use strict";
const utils=require("../utils");
const DAOPreguntas = require("../models/DAOPreguntas");
const config = require("../config");
const mysql = require("mysql");
// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
// Crear instancia 
const daoP = new DAOPreguntas(pool);


function mostrarTodas(request, response, next) {
    daoP.mostrarTodasPreguntas(function (err, qList, numPreguntas) {
        if (err) {
            next(err);
        }
        else {
            response.status(200);
            response.render("preguntas", { qList: qList, numPreguntas: numPreguntas });
        }
    });
}

function getFormularPregunta(request, response, next) {
    response.status(200);
    response.render("formularPregunta", { errorMsg: null });
}

function formularPregunta(request, response, next) {
    if (utils.createTask(request.body.preguntaNueva).tags.length > 5) {
        response.status(200);
        response.render("formularPregunta", { errorMsg: "Como máximo son 5 etiquetas" });
    } else {
        daoP.insertarPregunta(response.locals.usuario.id, request.body.titulo, request.body.cuerpo, utils.createTask(request.body.preguntaNueva), function (err) {

            if (err) {
                next(err);
            }
            else {
                daoP.contPregunta(response.locals.usuario.id, function (err) {
                    if (err) {
                        next(err);
                    }
                    else {
                        response.redirect("/pregunta/preguntas");
                    }
                });
            }
        });
    }
}

function filtroTexto(request, response, next) {
    daoP.mostrarPreguntasText(request.body.buscador, function (err, qList, numPreguntas) {
        if (err) {
            next(err);
        }
        else {
            response.status(200);
            response.render("preguntasText", { qList: qList, numPreguntas: numPreguntas });
        }
    })
}

function filtroEtiqueta(request, response, next) {

    daoP.mostrarPreguntasEtiqueta(request.params.id, function (err, qList, numPreguntas) {
        if (err) {
            next(err);
        }
        else {
            response.status(200);
            response.render("preguntasEtiqueta", { qList: qList, numPreguntas: numPreguntas });
        }
    })

}

function mostrarPreguntasSinResponder(request, response, next) {
    daoP.mostrarPreguntasSinResponder(function (err, qList, numPreguntas) {
        if (err) {
            next(err);
        }
        else {
            response.status(200);
            response.render("preguntasSinResponder", { qList: qList, numPreguntas: numPreguntas });
        }
    })
}

function infoP(request, response, next) {
    daoP.getPregunta(request.params.id, function (err, p, etiquetas) {
        if (err) {
            next(err);
        }
        else {
            daoP.mostrarRespuestasporPregunta(request.params.id, function (err, r) {
                if (err) {
                    next(err);
                }
                else {
                    daoP.visitaPregunta(request.params.id, response.locals.usuario.id, function (err, visitado) {
                        if (err) {
                            next(err);
                        }
                        else {
                            if (visitado === "true") {
                                response.status(200);
                                response.render("infoPregunta", { p: p, etiquetas: etiquetas, r: r });
                            } else {
                                daoP.actualizarMedallasPreguntasVisitadas(request.params.id, function (err) {
                                    if (err) {
                                        next(err);
                                    }
                                    else {
                                        response.status(200);
                                        response.render("infoPregunta", { p: p, etiquetas: etiquetas, r: r });
                                    }
                                })
                            }

                        }

                    })
                }

            })

        }

    })
}

function formularRespuesta(request, response, next) {
    daoP.insertarRespuesta(response.locals.usuario.id, request.body.IdPregunta, request.body.cuerpo, function (err) {
        if (err) {
            next(err);
        }
        else {
            daoP.contRespuesta(response.locals.usuario.id, function (err) {
                if (err) {
                    next(err);
                }
                else {
                    response.redirect("/pregunta/preguntas");
                }
            });
        }
    });

}

function actualizarVotos(request, response, next) {
    daoP.contVotos(response.locals.usuario.id, request.body.IdPregunta, function (err, votado) {
        if (err) {
            next(err);
        }
        else {
            if (request.body.positivo != undefined && votado === "true") {
                daoP.reputacion(request.body.IdPregunta, request.body.positivo, function (err) {
                    if (err) {
                        next(err);
                    }
                    else {
                        daoP.puntos(request.body.IdPregunta, 1, function (err) {
                            if (err) {
                                next(err);
                            }
                            else {
                                daoP.actualizarMedallasPuntosPreguntas(request.body.IdPregunta, function (err) {
                                    if (err) {
                                        next(err);
                                    }
                                    else {
                                        response.redirect("/pregunta/infoPregunta/" + request.body.IdPregunta);
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (request.body.negativo != undefined && votado === "true") {
                daoP.reputacion(request.body.IdPregunta, request.body.negativo, function (err) {
                    if (err) {
                        next(err);
                    }
                    else {
                        daoP.puntos(request.body.IdPregunta, -1, function (err) {
                            if (err) {
                                next(err);
                            }
                            else {
                                response.redirect("/pregunta/infoPregunta/" + request.body.IdPregunta);
                            }
                        });
                    }
                });
            } else {
                response.redirect("/pregunta/infoPregunta/" + request.body.IdPregunta);
            }
        }
    });
}

function actualizarVotosRespuesta(request, response, next) {
    daoP.contVotosRespuesta(response.locals.usuario.id, request.body.IdRespuesta, function (err, votado) {
        if (err) {
            next(err);
        }
        else {
            if (request.body.positivo != undefined && votado === "true") {
                daoP.reputacionRespuesta(request.body.IdRespuesta, request.body.positivo, function (err) {
                    if (err) {
                        next(err);
                    }
                    else {
                        daoP.puntosRespuesta(request.body.IdRespuesta, 1, function (err) {
                            if (err) {
                                next(err);
                            }
                            else {
                                daoP.actualizarMedallasPuntosRespuestas(request.body.IdRespuesta, function (err) {
                                    if (err) {
                                        next(err);
                                    }
                                    else {
                                        response.redirect("/pregunta/infoPregunta/" + request.body.idP);
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (request.body.negativo != undefined && votado === "true") {
                daoP.reputacionRespuesta(request.body.IdRespuesta, request.body.negativo, function (err) {
                    if (err) {
                        next(err);
                    }
                    else {
                        daoP.puntosRespuesta(request.body.IdRespuesta, -1, function (err) {
                            if (err) {
                                next(err);
                            }
                            else {
                                response.redirect("/pregunta/infoPregunta/" + request.body.idP);
                            }
                        });
                    }
                });
            } else {
                response.redirect("/pregunta/infoPregunta/" + request.body.idP);
            }
        }
    });
}



module.exports = {
    mostrarTodas: mostrarTodas,
    getFormularPregunta:getFormularPregunta,
    formularPregunta: formularPregunta,
    filtroTexto: filtroTexto,
    filtroEtiqueta: filtroEtiqueta,
    mostrarPreguntasSinResponder: mostrarPreguntasSinResponder,
    infoP: infoP,
    formularRespuesta: formularRespuesta,
    actualizarVotos: actualizarVotos,
    actualizarVotosRespuesta: actualizarVotosRespuesta
}