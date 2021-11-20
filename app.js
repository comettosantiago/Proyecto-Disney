//---------------------------------------------
//--------------------API----------------------
//---------------------------------------------
const { response } = require('express');
const express = require('express');
const app = express();
const database = require('./database');
const cors = require('cors');

//--------MIDDLEWARES-------------
app.use(express.json());
app.use(cors());

//--------------RUTAS---------------
//obtener todos los personajes
app.get('/characters', (req, res) => {
    const db = database.getDatabaseInstance();
    const result = db.getAllPersonajes(); //const result recibe el resolve/reject del Promise

    result
        .then((datosDevueltos) => res.json(datosDevueltos));
});

//creacion de personajes

app.post('/characters/insert', (req, res) => {
    const {nombre, edad, peso, historia } = req.body

    const db = database.getDatabaseInstance();
    const result = db.createPersonaje(nombre, edad, peso, historia);

    result
        .then(data => res.send(data));
})

//edicion de personajes
app.patch('/characters/update/:id', (req, res) => {
    const db = database.getDatabaseInstance();
    const id = req.params.id;
    const result = db.editPersonaje(personaje, id);

    result
        .then(data => res.send(data));
})

//eliminado de personajes
app.delete('/characters/delete/:id', (req, res) => {
    const db = database.getDatabaseInstance();
    const id = req.params.id;
    const result = db.deletePersonaje(id);

    result
        .then(data => res.send(data));
})

//---------SERVER RUN-------------
app.listen(process.env.PORT, () => {
    console.log('Corriendo en puerto ' + process.env.PORT);
})