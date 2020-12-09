"use strict";

class DAOPreguntas {
    constructor(pool) {
        this.pool = pool;
    }

        //Mostrar todas las preguntas.
            mostrartodasPreguntas(callback) { 

                this.pool.getConnection(function(err, connection) {
                    if (err) { 
                        callback(new Error("Error de conexión a la base de datos"));
                    }
                    else {
                    connection.query("SELECT (titulo, cuerpo, etiqueta, fecha) FROM preguntas",
                    function(err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (rows.length == 0) {//la consulta no ha devuelto resultados
                            callback(new Error("No hay preguntas"));
                        } else {
                            callback(null);
                        }
                    });
                    }
                }
                );
            }

    //Mostrar una pragunta de un usuario.
    mostrarPregunta(idPregunta, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT (titulo, cuerpo, etiqueta, fecha, contVisitas, contVotosPos) FROM preguntas JOIN usuarios WHERE idPregunta = ?",[idPregunta],
            function(err, rows) {
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

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT * FROM preguntas WHERE idPregunta = ?",[id],
            function(err, rows) {
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

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT (cuerpo, contVotosPos, contVotosNeg, fecha) FROM respuestas JOIN preguntas WHERE respuestas.idPregunta = ?",[idPregunta],
            function(err, rows) {
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

}

module.exports = DAOPreguntas;
