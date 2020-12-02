"use strict";

class DAOTasks {
    constructor(pool) {
        this.pool = pool;
    }

    /*Tareas de usuario: Devuelve todas las tareas asociadas a un usuario con sus etiquetas correspondientes*/
    getAllTasks(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT id, text, done, tag FROM task JOIN tag ON task.id = tag.taskId WHERE user = ?", [email],
                    function (err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            let array = new Array();//array de tareas
                            let object = new Object(); // elemento del array de tareas, que contiene la informacion de tareas
                            rows.forEach(element => {
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
                            });
                            array = array.filter(n => n); //para eliminar las vacias
                            callback(null, array);//devuelve el array
                        }
                    });
            }
        });
    }

    /*Nuevas tareas: inserta una nueva tarea asociandola al usuario cuyo id es el email*/
    insertTask(email, task, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("INSERT INTO task (user, text, done) VALUES (?,?,?)", [email, task.text, 0],
                    function (err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            let id = rows.insertId;
                            let array = new Array();//array de etiquetas
                            task.tag.forEach(element => {
                                let val = [id, element];
                                array.push(val);
                            });
                            //Insertar las etiquetas
                            connection.query("INSERT INTO tag VALUES ?", [array],
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

    /*Tareas finalizadas: marca la tarea con idTask como realizada */
    markTaskDone(idTask, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("UPDATE task SET done=1 WHERE id = ?", [idTask],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null);
                        }
                    });
            }
        }
        );
    }

    /*Borrar tareas: elimina todas las tareas asociadas al usuario cuyo correo es email y que tengan el valor true en la columna done*/
    deleteCompleted(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("DELETE FROM task WHERE user = ? AND done=?", [email,1],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null);
                        }
                    });
            }
        }
        );
    }
}

module.exports = DAOTasks;
