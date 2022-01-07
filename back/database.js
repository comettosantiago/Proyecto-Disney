//-------------------------------------------
//-------------OBJETOS DATABASE--------------
//-------------------------------------------
const mysql = require('mysql');
const dotenv = require('dotenv');
const { response } = require('express');
let instance = null;

dotenv.config();

//llamo a los parametros de .env
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

//conecto con la db
connection.connect((error) => {
    if (error) {
        console.log('Error conectando a DB : ' + error);
    } else {
        console.log('Conectado a BD')
    }
});

//--------OBJETO DATABASE---------

class database {
    static getDatabaseInstance() {
        if (instance == null) {
            return instance = new database();
        } else {
            return instance;
        }
    }
    //---------QUERYS PARA PERSONAJES--------
    //query para obtener todos personajes
    async getAllPersonajes() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT id_personaje, nombre, edad FROM personaje";

                connection.query(query, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });

            return response;

        } catch (error) {
            console.log('error: ' + error);
        }
    }

    //query para crear personajes
    async createPersonaje(dato2, dato3, dato4, dato5) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO personaje (nombre, edad, peso, historia) VALUES (?, ?, ?, ?)"

                connection.query(query, [dato2, dato3, dato4, dato5], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            return response;
        } catch (error) {
            console.log('error: ' + error);
        }
    }

    //query para editar personajes
    async editPersonaje(dato2, dato3, dato4, dato5, id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE personaje SET nombre = ?, edad =  ?, peso = ?, historia = ? WHERE id_personaje = ?";

                connection.query(query, [dato2, dato3, dato4, dato5, id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    //query para elimiar personajes
    async deletePersonaje(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM personaje WHERE id_personaje = " + id;

                connection.query(query, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    //---------QUERYS PARA PELICULAS--------
    //query para obtener todas peliculas
    async getAllPeliculas() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT id_pelicula, titulo, calificacion FROM pelicula";

                connection.query(query, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });

            return response;

        } catch (error) {
            console.log('error: ' + error);
        }
    }

    //query para crear peliculas
    async createPelicula(dato2, dato3, dato4) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO pelicula (titulo, fecha_creacion, calificacion) VALUES (?, ?, ?)"

                connection.query(query, [dato2, dato3, dato4], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            return response;
        } catch (error) {
            console.log('error: ' + error);
        }
    }

    //query para editar peliculas
    async editPelicula(dato2, dato3, dato4, id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE pelicula SET titulo = ?, fecha_creacion =  ?, calificacion = ? WHERE id_pelicula = ?";

                connection.query(query, [dato2, dato3, dato4, id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    //query para elimiar personajes
    async deletePelicula(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM pelicula WHERE id_pelicula = " + id;

                connection.query(query, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
            return response;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = database;

