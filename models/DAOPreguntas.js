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
                connection.query("SELECT preguntas.idPregunta, preguntas.titulo, preguntas.cuerpo, usuarios.nombre as usuario, usuarios.fecha, usuarios.imagen, etiquetas.nombre as etiqueta\
                FROM preguntas INNER JOIN usuarios INNER JOIN etiquetas WHERE preguntas.idUsuario = usuarios.id AND preguntas.idPregunta = etiquetas.idPregunta",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error acceso a la base de datos"));
                        } else {
                            let array = new Array();    //Array de usuarios
                            let object = new Object();
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
                                }
                                else {
                                    array[object.idPregunta].tags.push(element.etiqueta);
                                }
                            });
                            callback(null, array);//devuelve el array
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
                connection.query("SELECT preguntas.idPregunta, preguntas.titulo, preguntas.cuerpo, usuarios.nombre as usuario, usuarios.fecha, usuarios.imagen, etiquetas.nombre as etiqueta\
                FROM preguntas INNER JOIN usuarios INNER JOIN etiquetas WHERE preguntas.idUsuario = usuarios.id AND preguntas.idPregunta = etiquetas.idPregunta",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error acceso a la base de datos"));
                        } else {
                            let array = new Array();    //Array de usuarios
                            let object = new Object();
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
                                }
                                else {
                                    array[object.idPregunta].tags.push(element.etiqueta);
                                }
                            });
                            callback(null, array);//devuelve el array
                        }
                    });
            }
        }
        );
    }

    insertarPregunta(idUsuario,titulo,cuerpo, pregunta, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
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

    //Mostrar una pragunta de un usuario.
    mostrarPregunta(idPregunta, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT (titulo, cuerpo, etiqueta, fecha, contVisitas, contVotosPos) FROM preguntas JOIN usuarios WHERE idPregunta = ?", [idPregunta],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (rows.length == 0) {//la consulta no ha devuelto resultados
                            callback(new Error("No existe pregunta"));
                        } else {
                            callback(null, rows[0]);
                        }
                    });
            }
        }
        );
    }

    //Obtener una pregunta
    getPregunta(id, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM preguntas WHERE idPregunta = ?", [id],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (rows.length == 0) {//la consulta no ha devuelto resultados
                            callback(new Error("No existe la pregunta"));
                        } else {
                            callback(null, rows[0]);
                        }
                    });
            }
        }
        );
    }

    mostrarRespuestasporPregunta(idPregunta, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT (cuerpo, contVotosPos, contVotosNeg, fecha) FROM respuestas JOIN preguntas WHERE respuestas.idPregunta = ?", [idPregunta],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (rows.length == 0) {//la consulta no ha devuelto resultados
                            callback(new Error("No existe respuestas"));
                        } else {
                            callback(null, rows[0]);
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
