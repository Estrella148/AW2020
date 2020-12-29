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
                connection.query("SELECT idPregunta, preguntas.titulo, preguntas.cuerpo, preguntas.fecha, usuarios.nombre, usuarios.imagen, etiquetas.nombre as etiqueta \
                FROM preguntas JOIN etiquetas JOIN usuarios ON preguntas.idPregunta = etiquetas.idPregunta AND preguntas.idUsuario = usuarios.idUsuario",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error acceso a la base de datos"));
                        } else {
                            let array = new Array();    //Array de usuarios
                            let object = new Object();
                            rows.forEach(element => {
                                if (array[element.idPregunta] == undefined) {
                                    object = {
                                        idPregunta: element.idPregunta,
                                        titulo: element.titulo,
                                        cuerpo: element.cuerpo,
                                        fecha: element.fecha,
                                        nombre: element.nombre,
                                        imagen: element.imagen,
                                        etiquetas: [element.etiqueta]
                                    };
                                    array[object.idPregunta] = object;
                                }
                                else {
                                    array[object.idPregunta].etiquetas.push(element.etiqueta);
                                }
                            });
                            callback(null, array);//devuelve el array
                        }
                    });
            }
        }
        );
    }

    /*rows.forEach(element => {
        if (array[element.id] == undefined) {
            object = {
                id: element.id,
                text: element.text,
                done: element.done,
                tags: [element.tag] //array con las etiquetas asociadas a la tarea
            };
            array[object.id] = object;
        }
        else {
            array[object.id].tags.push(element.tag);
        }
*/
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
