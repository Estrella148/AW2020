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
                connection.query("SELECT preguntas.idPregunta, preguntas.titulo, preguntas.cuerpo, usuarios.nombre as usuario,preguntas.fecha, usuarios.imagen, etiquetas.nombre as etiqueta\
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
                connection.query("SELECT preguntas.idPregunta, preguntas.titulo, preguntas.cuerpo, usuarios.nombre as usuario, preguntas.fecha, usuarios.imagen, etiquetas.nombre as etiqueta\
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
                connection.query("SELECT preguntas.idPregunta, preguntas.titulo, preguntas.cuerpo, usuarios.nombre as usuario, preguntas.fecha, usuarios.imagen, etiquetas.nombre as etiqueta\
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
                connection.query("SELECT preguntas.idPregunta, preguntas.titulo, preguntas.cuerpo, usuarios.nombre as usuario,preguntas.fecha, usuarios.imagen, etiquetas.nombre as etiqueta\
                FROM preguntas JOIN usuarios ON preguntas.idUsuario = usuarios.id JOIN etiquetas ON preguntas.idPregunta = etiquetas.idPregunta JOIN respuestas ON preguntas.idPregunta<>respuestas.idPregunta",
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
                connection.query("ALTER TABLE preguntas AUTO_INCREMENT = 0");
                connection.query("INSERT INTO preguntas (titulo, cuerpo, idUsuario, fecha, contVisitas, contVotosPos, contVotosNeg)\
                VALUES (?,?,?,CURDATE(),0,0,0)", [titulo, cuerpo, idUsuario],
                    function (err, rows) {
                        connection.release();
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
                connection.query("SELECT preguntas.idPregunta, preguntas.titulo, preguntas.cuerpo, preguntas.fecha, preguntas.contVisitas,preguntas.contVotosPos,preguntas.contVotosNeg,\
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

    insertarRespuesta(idUsuario, idPregunta, cuerpo,  callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("INSERT INTO respuestas (idUsuario, cuerpo, idPregunta, fecha, contVotosPos, contVotosNeg)\
                VALUES (?,?,?,CURDATE(),0,0)", [idUsuario, cuerpo, idPregunta],
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
                connection.query("SELECT respuestas.cuerpo, respuestas.contVotosPos, respuestas.contVotosNeg, respuestas.fecha, usuarios.nombre, usuarios.imagen\
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
