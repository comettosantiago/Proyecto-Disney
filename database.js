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
        console.log('Error conectando a DB :' + error);
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
                const query = "SELECT imagen, nombre, peso FROM personaje";

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
    async createPersonaje(personaje) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO personaje (imagen, nombre, edad, peso, historia) VALUES (?)"

                connection.query(query, [personaje], (error, result) => {
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
    async editPersonaje(personaje, id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE personaje SET imagen = ?, nombre = ?, edad =  ?, peso = ?, historia = ? WHERE id_personaje = ?";

                connection.query(query, [personaje[0], personaje[1], personaje[2], personaje[3], personaje[4], id], (err, result) => {
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

}

module.exports = database;

