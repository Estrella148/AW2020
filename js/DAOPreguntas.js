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
                        if (result.length == 0) {//la consulta no ha devuelto resultados
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
    mostrarPregunta(id, callback) { 

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT * FROM preguntas JOIN usuarios WHERE idPregunta = ?",[id],
            function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (result.length == 0) {//la consulta no ha devuelto resultados
                    callback(new Error("No existe el usuario"));
                } else {
                    callback(null, result[0]);
                }
            });
            }
        }
        );
    }

}

module.exports = DAOPreguntas;
