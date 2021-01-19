"use strict";

class DAOPreguntas {
    constructor(pool) {
        this.pool = pool;
    }

    //Mostrar todas las preguntas.
    mostrarTodasPreguntas(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT preguntas.idPregunta, preguntas.titulo, preguntas.cuerpo, preguntas.idUsuario, usuarios.nombre as usuario,preguntas.fecha, usuarios.imagen, etiquetas.nombre as etiqueta\
                FROM preguntas JOIN usuarios ON preguntas.idUsuario = usuarios.id JOIN etiquetas ON preguntas.idPregunta = etiquetas.idPregunta",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error acceso a la base de datos"));
                        } else {
                            let array = new Array();
                            let object = new Object();
                            let numPreguntas = 0;
                            rows.forEach(element => {
                                if (array[element.idPregunta] === undefined) {
                                    object = {
                                        idPregunta: element.idPregunta,
                                        titulo: element.titulo,
                                        cuerpo: element.cuerpo,
                                        fecha: element.fecha,
                                        nombre: element.usuario,
                                        imagen: element.imagen,
                                        idUsuario: element.idUsuario,
                                        tags: [element.etiqueta]
                                    };
                                    array[object.idPregunta] = object;
                                    numPreguntas++;
                                }
                                else {
                                    array[object.idPregunta].tags.push(element.etiqueta);
                                }
                            });
                            array.reverse();
                            callback(null, array, numPreguntas);//devuelve el array
                        }
                    });
            }
        }
        );
    }

    //Mostrar todas las preguntas.
    mostrarPreguntasUsuario(id,callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT preguntas.idPregunta, preguntas.titulo, preguntas.cuerpo, preguntas.idUsuario, usuarios.nombre as usuario,preguntas.fecha, usuarios.imagen, etiquetas.nombre as etiqueta\
                FROM preguntas JOIN usuarios ON preguntas.idUsuario = usuarios.id JOIN etiquetas ON preguntas.idPregunta = etiquetas.idPregunta WHERE preguntas.idUsuario=?",[id],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error acceso a la base de datos"));
                        } else {
                            let array = new Array();
                            let object = new Object();
                            let numPreguntas = 0;
                            rows.forEach(element => {
                                if (array[element.idPregunta] === undefined) {
                                    object = {
                                        idPregunta: element.idPregunta,
                                        titulo: element.titulo,
                                        cuerpo: element.cuerpo,
                                        fecha: element.fecha,
                                        nombre: element.usuario,
                                        imagen: element.imagen,
                                        idUsuario: element.idUsuario,
                                        tags: [element.etiqueta]
                                    };
                                    array[object.idPregunta] = object;
                                    numPreguntas++;
                                }
                                else {
                                    array[object.idPregunta].tags.push(element.etiqueta);
                                }
                            });
                            array.reverse();
                            callback(null, array, numPreguntas);//devuelve el array
                        }
                    });
            }
        }
        );
    }

    mostrarPreguntasText(filtro, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT preguntas.idPregunta,preguntas.idUsuario, preguntas.titulo, preguntas.cuerpo, usuarios.nombre as usuario, preguntas.fecha, usuarios.imagen, etiquetas.nombre as etiqueta\
                FROM preguntas JOIN usuarios ON preguntas.idUsuario = usuarios.id JOIN etiquetas ON preguntas.idPregunta = etiquetas.idPregunta WHERE \
                preguntas.titulo LIKE ? OR preguntas.cuerpo LIKE ? ", ['%' + filtro + '%', '%' + filtro + '%'],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(err);
                        } else {
                            let array = new Array();    //Array de usuarios
                            let object = new Object();
                            let numPreguntas = 0;
                            rows.forEach(element => {
                                if (array[element.idPregunta] === undefined) {
                                    object = {
                                        idPregunta: element.idPregunta,
                                        titulo: element.titulo,
                                        cuerpo: element.cuerpo,
                                        fecha: element.fecha,
                                        nombre: element.usuario,
                                        imagen: element.imagen,
                                        idUsuario: element.idUsuario,
                                        tags: [element.etiqueta]
                                    };
                                    array[object.idPregunta] = object;
                                    numPreguntas++;
                                }
                                else {
                                    array[object.idPregunta].tags.push(element.etiqueta);
                                }
                            });

                            array.reverse();
                            callback(null, array, numPreguntas);//devuelve el array
                        }
                    });
            }
        }
        );
    }

    mostrarPreguntasEtiqueta(filtroEtiqueta, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT preguntas.idPregunta,preguntas.idUsuario, preguntas.titulo, preguntas.cuerpo, usuarios.nombre as usuario, preguntas.fecha, usuarios.imagen, etiquetas.nombre as etiqueta\
                FROM preguntas JOIN usuarios ON preguntas.idUsuario = usuarios.id JOIN etiquetas ON preguntas.idPregunta = etiquetas.idPregunta WHERE preguntas.idPregunta IN (\
                SELECT preguntas.idPregunta FROM preguntas JOIN usuarios ON preguntas.idUsuario = usuarios.id JOIN etiquetas ON preguntas.idPregunta = etiquetas.idPregunta WHERE etiquetas.nombre=?)", [filtroEtiqueta],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error acceso a la base de datos"));
                        } else {
                            let array = new Array();    //Array de usuarios
                            let object = new Object();
                            let numPreguntas = 0;
                            rows.forEach(element => {
                                if (array[element.idPregunta] === undefined) {
                                    object = {
                                        idPregunta: element.idPregunta,
                                        titulo: element.titulo,
                                        cuerpo: element.cuerpo,
                                        fecha: element.fecha,
                                        nombre: element.usuario,
                                        imagen: element.imagen,
                                        idUsuario: element.idUsuario,
                                        tags: [element.etiqueta]
                                    };
                                    array[object.idPregunta] = object;
                                    numPreguntas++;
                                }
                                else {
                                    array[object.idPregunta].tags.push(element.etiqueta);
                                }
                            });

                            array.reverse();
                            callback(null, array, numPreguntas);//devuelve el array
                        }
                    });
            }
        }
        );
    }

    mostrarPreguntasSinResponder(callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT preguntas.idPregunta, preguntas.titulo,preguntas.idUsuario, preguntas.cuerpo, usuarios.nombre as usuario, preguntas.fecha, usuarios.imagen, etiquetas.nombre as etiqueta\
                 FROM preguntas JOIN usuarios ON preguntas.idUsuario = usuarios.id JOIN etiquetas ON preguntas.idPregunta = etiquetas.idPregunta\
                 WHERE preguntas.idPregunta NOT IN ( SELECT preguntas.idPregunta FROM preguntas JOIN usuarios ON preguntas.idUsuario = usuarios.id JOIN etiquetas ON preguntas.idPregunta = etiquetas.idPregunta \
                    JOIN respuestas WHERE respuestas.idPregunta=preguntas.idPregunta)",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error acceso a la base de datos"));
                        } else {
                            let array = new Array();    //Array de usuarios
                            let object = new Object();
                            let numPreguntas = 0;
                            rows.forEach(element => {
                                if (array[element.idPregunta] === undefined) {
                                    object = {
                                        idPregunta: element.idPregunta,
                                        titulo: element.titulo,
                                        cuerpo: element.cuerpo,
                                        fecha: element.fecha,
                                        nombre: element.usuario,
                                        imagen: element.imagen,
                                        idUsuario: element.idUsuario,
                                        tags: [element.etiqueta]
                                    };
                                    array[object.idPregunta] = object;
                                    numPreguntas++;
                                }
                                else {
                                    array[object.idPregunta].tags.push(element.etiqueta);
                                }
                            });
                            array.reverse();
                            callback(null, array, numPreguntas);//devuelve el array
                        }
                    });
            }
        }
        );
    }

    insertarPregunta(idUsuario, titulo, cuerpo, pregunta, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("INSERT INTO preguntas (titulo, cuerpo, idUsuario, fecha, contVisitas, contVotos)\
                VALUES (?,?,?,CURDATE(),0,0)", [titulo, cuerpo, idUsuario],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            let id = rows.insertId;
                            let array = new Array();//array de etiquetas
                            pregunta.tags.forEach(element => {
                                let val = [id, element];
                                array.push(val);
                            });
                            //Insertar las etiquetas
                            connection.query("INSERT INTO etiquetas VALUES ?", [array],
                                function (err, rows) {
                                    
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    }
                                    else {
                                        callback(null);
                                    }
                                });
                        }
                        connection.release();
                    });
            }
        });
    }
    contPregunta(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("UPDATE usuarios SET contPreguntas= contPreguntas+1 WHERE usuarios.id=?", [id],
                    function (err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null);
                        }
                    });
            }
        });
    }

    contRespuesta(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("UPDATE usuarios SET contRespuestas= contRespuestas+1 WHERE usuarios.id=?", [id],
                    function (err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null);
                        }
                    });
            }
        });
    }

    contVotos(idU, idP, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT votoPregunta FROM votospregunta WHERE idUsuario=? AND idPregunta=?", [idU, idP],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (rows[0].votoPregunta === 0) {//si no ha votado
                                //actualizar a que ha votado el usuario esa pregunta
                                connection.query("UPDATE votospregunta SET votoPregunta=1 WHERE idUsuario=? AND idPregunta=?", [idU, idP],
                                    function (err, rows) {
                                        
                                        if (err) {
                                            callback(new Error("Error de acceso a la Base de datos"));
                                        }
                                        else {//actualiza tabla según sea un voto positivo o negativo
                                            connection.query("UPDATE preguntas SET contVotos=contVotos+1 WHERE preguntas.idPregunta=?", [idP],
                                                function (err, rows) {
                                                    if (err) {
                                                        callback(new Error("Error de acceso a la Base de datos"));
                                                    }
                                                    else {
                                                        callback(null, "true")
                                                    }
                                                });
                                        }
                                    });
                            } else {
                                callback(null, "false")
                            }

                        }
                        connection.release();
                    });
            }
        });
    }

    contVotosRespuesta(idU, idRespuesta, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT votoRespuesta FROM votosrespuesta WHERE idUsuario=? AND idRespuesta=?", [idU, idRespuesta],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (rows[0] == undefined || rows[0].votoRespuesta != 1) {//si no ha votado
                                //actualizar a que ha votado el usuario esa pregunta
                                connection.query("INSERT INTO votosrespuesta (idUsuario, idRespuesta, votoRespuesta) VALUES (?,?,1)", [idU, idRespuesta],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de Acceso a la Base de datos"));
                                        }
                                        else {//actualiza tabla según sea un voto positivo o negativo
                                            connection.query("UPDATE respuestas SET contVotos=contVotos+1 WHERE respuestas.idRespuesta=?", [idRespuesta],
                                                function (err, rows) {
                                                   
                                                    if (err) {
                                                        callback(new Error("Error de acceso a la Base de datos"));
                                                    }
                                                    else {
                                                        callback(null, "true")
                                                    }
                                                });
                                        }
                                    });
                            } else {
                                callback(null, "false")
                            }

                        }
                        connection.release();
                    });
            }
        });
    }

    reputacion(id, boton, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT idUsuario FROM preguntas WHERE preguntas.idPregunta = ?", [id],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            let idU = rows[0].idUsuario;
                            connection.query("SELECT reputacion FROM usuarios WHERE id = ?", [idU],
                                function (err, rows) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    }
                                    else {
                                        let total = rows[0].reputacion + parseInt(boton);
                                        if (total < 1) { total = 1; }
                                        connection.query("UPDATE usuarios SET reputacion=? WHERE id = ?", [total, idU],
                                            function (err, rows) {
                                               
                                                if (err) {
                                                    callback(new Error("Error de acceso a la base de datos"));
                                                }
                                                else {
                                                    callback(null)
                                                }
                                            });
                                    }
                                });
                        }
                        connection.release();
                    });
            }
        }
        );
    }

    reputacionRespuesta(id, boton, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT idUsuario FROM respuestas WHERE respuestas.idRespuesta = ?", [id],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            let idU = rows[0].idUsuario;
                            connection.query("SELECT reputacion FROM usuarios WHERE id = ?", [idU],
                                function (err, rows) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    }
                                    else {
                                        let total = rows[0].reputacion + parseInt(boton);
                                        if (total < 1) { total = 1; }
                                        connection.query("UPDATE usuarios SET reputacion=? WHERE id = ?", [total, idU],
                                            function (err, rows) {
                                                // devolver al pool la conexión
                                                if (err) {
                                                    callback(new Error("Error de acceso a la base de datos"));
                                                }
                                                else {
                                                    callback(null)
                                                }
                                            });
                                    }
                                });
                        }
                        connection.release();
                    });
            }
        }
        );
    }

    puntos(idP, punto, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("UPDATE preguntas SET puntosPregunta=puntosPregunta+? WHERE idPregunta=?", [punto, idP],
                    function (err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null);
                        }
                    });
            }
        });
    }

    puntosRespuesta(idR, punto, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("UPDATE respuestas SET puntosRespuesta=puntosRespuesta+? WHERE idRespuesta=?", [punto, idR],
                    function (err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null);
                        }
                    });
            }
        });
    }

    actualizarMedallasPuntosPreguntas(idP, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT idUsuario, puntosPregunta FROM preguntas WHERE idPregunta=?", [idP],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            let usuario = rows[0].idUsuario;
                            if (rows[0].puntosPregunta == 1) {
                                let nombre = "Estudiante";
                                connection.query("SELECT idUsuario, nombre, cantidad FROM medallabronce WHERE idUsuario=? AND nombre=?", [usuario, nombre],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            if (rows[0] == undefined) {
                                                connection.query("INSERT INTO medallabronce (idUsuario, nombre, cantidad) VALUES (?,?,1)", [usuario, nombre],
                                                    function (err, rows) {
                                                       
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }
                                                    });
                                            } else {
                                                connection.query("UPDATE medallabronce SET cantidad=cantidad+1 WHERE idUsuario=? AND nombre=?", [usuario,nombre],
                                                    function (err, rows) {
                                                        
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }

                                                    });
                                            }
                                        }
                                    });
                            } else if (rows[0].puntosPregunta == 2) {
                                let nombre = "Pregunta interesante";
                                connection.query("SELECT idUsuario, nombre, cantidad FROM medallabronce WHERE idUsuario=? AND nombre=?", [usuario, nombre],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            if (rows[0] == undefined) {
                                                connection.query("INSERT INTO medallabronce (idUsuario, nombre, cantidad) VALUES (?,?,1)", [usuario, nombre],
                                                    function (err, rows) {
                                                        
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }
                                                    });
                                            } else {
                                                connection.query("UPDATE medallabronce SET cantidad=cantidad+1 WHERE idUsuario=? AND nombre=?", [usuario,nombre],
                                                    function (err, rows) {
                                                        
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }

                                                    });
                                            }
                                        }
                                    });
                            } else if (rows[0].puntosPregunta == 4) {
                                let nombre = "Buena pregunta";
                                connection.query("SELECT idUsuario, nombre, cantidad FROM medallaplata WHERE idUsuario=? AND nombre=?", [usuario, nombre],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            if (rows[0] == undefined) {
                                                connection.query("INSERT INTO medallaplata (idUsuario, nombre, cantidad) VALUES (?,?,1)", [usuario, nombre],
                                                    function (err, rows) {
                                                       
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }
                                                    });
                                            } else {
                                                connection.query("UPDATE medallaplata SET cantidad=cantidad+1 WHERE idUsuario=? AND nombre=?", [usuario,nombre],
                                                    function (err, rows) {
                                                        
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }

                                                    });
                                            }
                                        }
                                    });
                            } else if (rows[0].puntosPregunta == 6) {
                                let nombre = "Excelente pregunta";
                                connection.query("SELECT idUsuario, nombre, cantidad FROM medallaoro WHERE idUsuario=? AND nombre=?", [usuario, nombre],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            if (rows[0] == undefined) {
                                                connection.query("INSERT INTO medallaoro (idUsuario, nombre, cantidad) VALUES (?,?,1)", [usuario, nombre],
                                                    function (err, rows) {
                                                        
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }
                                                    });
                                            } else {
                                                connection.query("UPDATE medallaoro SET cantidad=cantidad+1 WHERE idUsuario=? AND nombre=?", [usuario,nombre],
                                                    function (err, rows) {
                                                        
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }

                                                    });
                                            }
                                        }
                                    });
                            } else {
                                callback(null);
                            }
                        }
                        connection.release();
                    });
            }
        });
    }

    actualizarMedallasPuntosRespuestas(idR, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT idUsuario, puntosRespuesta FROM respuestas WHERE idRespuesta=?", [idR],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos primero"));
                        }
                        else {
                            let usuario = rows[0].idUsuario;
                            if (rows[0].puntosRespuesta == 2) {
                                let nombre = "Respuesta interesante";
                                connection.query("SELECT idUsuario, nombre, cantidad FROM medallabronce WHERE idUsuario=? AND nombre=?", [usuario, nombre],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos fallo al seleccionar"));
                                        }
                                        else {
                                            if (rows[0] == undefined) {
                                                connection.query("INSERT INTO medallabronce (idUsuario, nombre, cantidad) VALUES (?,?,1)", [usuario, nombre],
                                                    function (err, rows) {
                                                      
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos insertar medalla bronce"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }
                                                    });
                                            } else {
                                                connection.query("UPDATE medallabronce SET cantidad=cantidad+1 WHERE idUsuario=? AND nombre=?", [usuario,nombre],
                                                    function (err, rows) {
                                                        
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos actualizar medalla bron"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }

                                                    });
                                            }
                                        }
                                    });
                            } else if (rows[0].puntosRespuesta == 4) {
                                let nombre = "Buena respuesta";
                                connection.query("SELECT idUsuario, nombre, cantidad FROM medallaplata WHERE idUsuario=? AND nombre=?", [usuario, nombre],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            if (rows[0] == undefined) {
                                                connection.query("INSERT INTO medallaplata (idUsuario, nombre, cantidad) VALUES (?,?,1)", [usuario, nombre],
                                                    function (err, rows) {
                                                       
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }
                                                    });
                                            } else {
                                                connection.query("UPDATE medallaplata SET cantidad=cantidad+1 WHERE idUsuario=? AND nombre=?", [usuario,nombre],
                                                    function (err, rows) {
                                                        
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }

                                                    });
                                            }
                                        }
                                    });
                            } else if (rows[0].puntosRespuesta == 6) {
                                let nombre = "Excelente respuesta";
                                connection.query("SELECT idUsuario, nombre, cantidad FROM medallaoro WHERE idUsuario=? AND nombre=?", [usuario, nombre],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            if (rows[0] == undefined) {
                                                connection.query("INSERT INTO medallaoro (idUsuario, nombre, cantidad) VALUES (?,?,1)", [usuario, nombre],
                                                    function (err, rows) {
                                                        
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }
                                                    });
                                            } else {
                                                connection.query("UPDATE medallaoro SET cantidad=cantidad+1 WHERE idUsuario=? AND nombre=?", [usuario,nombre],
                                                    function (err, rows) {
                                                        
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }

                                                    });
                                            }
                                        }
                                    });
                            } else {
                                callback(null);
                            }
                        }
                        connection.release();
                    });
            }
        });
    }

    actualizarMedallasPreguntasVisitadas(idP, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT idUsuario, contVisitas FROM preguntas WHERE idPregunta=?", [idP],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            let usuario = rows[0].idUsuario;
                            if (rows[0].contVisitas == 2) {
                                let nombre = "Pregunta popular";
                                connection.query("SELECT idUsuario, nombre, cantidad FROM medallabronce WHERE idUsuario=? AND nombre=?", [usuario, nombre],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            if (rows[0] == undefined) {
                                                connection.query("INSERT INTO medallabronce (idUsuario, nombre, cantidad) VALUES (?,?,1)", [usuario, nombre],
                                                    function (err, rows) {
                                                        
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }
                                                    });
                                            } else {
                                                connection.query("UPDATE medallabronce SET cantidad=cantidad+1 WHERE idUsuario=? AND nombre=?", [usuario,nombre],
                                                    function (err, rows) {
                                                       
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }

                                                    });
                                            }
                                        }
                                    });
                            } else if (rows[0].contVisitas == 4) {
                                let nombre = "Pregunta destacada";
                                connection.query("SELECT idUsuario, nombre, cantidad FROM medallaplata WHERE idUsuario=? AND nombre=?", [usuario, nombre],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            if (rows[0] == undefined) {
                                                connection.query("INSERT INTO medallaplata (idUsuario, nombre, cantidad) VALUES (?,?,1)", [usuario, nombre],
                                                    function (err, rows) {
                                                        
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }
                                                    });
                                            } else {
                                                connection.query("UPDATE medallaplata SET cantidad=cantidad+1 WHERE idUsuario=? AND nombre=?", [usuario,nombre],
                                                    function (err, rows) {
                                                       
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }

                                                    });
                                            }
                                        }
                                    });
                            } else if (rows[0].contVisitas == 6) {
                                let nombre = "Pregunta famosa";
                                connection.query("SELECT idUsuario, nombre, cantidad FROM medallaoro WHERE idUsuario=? AND nombre=?", [usuario, nombre],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            if (rows[0] == undefined) {
                                                connection.query("INSERT INTO medallaoro (idUsuario, nombre, cantidad) VALUES (?,?,1)", [usuario, nombre],
                                                    function (err, rows) {
                                                       
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }
                                                    });
                                            } else {
                                                connection.query("UPDATE medallaoro SET cantidad=cantidad+1 WHERE idUsuario=? AND nombre=?", [usuario,nombre],
                                                    function (err, rows) {
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }
                                                        else {
                                                            callback(null);
                                                        }

                                                    });
                                            }
                                        }
                                    });
                            } else {
                                callback(null);
                            }
                        }
                        connection.release();
                    });
            }
        });
    }

    //Obtener una pregunta y usuario que la ha preguntado
    getPregunta(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT preguntas.idPregunta, preguntas.idUsuario, preguntas.titulo, preguntas.cuerpo, preguntas.fecha, preguntas.contVisitas,preguntas.contVotos,\
                usuarios.nombre, usuarios.imagen, etiquetas.nombre as etiqueta FROM preguntas JOIN usuarios ON usuarios.id = preguntas.idUsuario JOIN etiquetas ON\
                preguntas.idPregunta = etiquetas.idPregunta WHERE preguntas.idPregunta = ?", [id],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            let array = new Array();
                            rows.forEach(element => {
                                array.push(element.etiqueta);

                            });
                            callback(null, rows[0], array);
                        }
                    });
            }
        }
        );
    }

    insertarRespuesta(idUsuario, idPregunta, cuerpo, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("INSERT INTO respuestas (idUsuario, cuerpo, idPregunta, fecha, contVotos)\
                VALUES (?,?,?,CURDATE(),0)", [idUsuario, cuerpo, idPregunta],
                    function (err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null);
                        }
                    });
            }
        });
    }


    mostrarRespuestasporPregunta(idPregunta, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT respuestas.idRespuesta, respuestas.idPregunta,respuestas.cuerpo, respuestas.contVotos, respuestas.fecha, usuarios.id as idUsuario, usuarios.nombre, usuarios.imagen\
                FROM respuestas JOIN usuarios ON respuestas.idUsuario = usuarios.id WHERE respuestas.idPregunta = ?", [idPregunta],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {//la consulta no ha devuelto resultados
                            callback(new Error("No existen respuestas"));
                        } else {
                            let array = new Array();
                            rows.forEach(element => {
                                array.push(element);

                            });
                            array.reverse();
                            callback(null, array);
                        }
                    });
            }
        }
        );
    }

    visitaPregunta(idP, idU, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT visitaPregunta FROM votosPregunta WHERE votosPregunta.idPregunta = ? AND votosPregunta.idUsuario = ?", [idP, idU],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (rows[0] == undefined) {
                                //insertar fila en tabla de visita preguntas 
                                connection.query("INSERT INTO votosPregunta (idUsuario,idPregunta,visitaPregunta,votoPregunta) VALUES (?,?,1,0)", [idU, idP],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la Base de datos"));
                                        }
                                        else {//actualizar contador de visitas en preguntas
                                            connection.query("UPDATE preguntas SET contVisitas=contVisitas+1 WHERE preguntas.idPregunta=?", [idP],
                                                function (err, rows) {
                                                    
                                                    if (err) {
                                                        callback(new Error("Error de acceso a la Base de datos"));
                                                    }
                                                    else {
                                                        callback(null,"false")
                                                    }
                                                });
                                        }
                                    });
                            }else{
                                callback(null,"true")
                            }  
                        }
                        connection.release();
                    })
            }
        });
    }

    getRespuesta(id, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM respuestas WHERE idRespuesta = ?", [id],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (rows.length == 0) {//la consulta no ha devuelto resultados
                            callback(new Error("No existe la respuesta"));
                        } else {
                            callback(null, rows[0]);
                        }
                    });
            }
        }
        );
    }

}

module.exports = DAOPreguntas;
