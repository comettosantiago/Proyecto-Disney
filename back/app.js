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

//PERSONAJES
//obtener todos los personajes
app.get('/characters', (req, res) => {
    const db = database.getDatabaseInstance();
    const result = db.getAllPersonajes(); //const result recibe el resolve/reject del Promise

    result
        .then((datosDevueltos) => res.json(datosDevueltos));
});

//creacion de personajes

app.post('/characters/insert', (req, res) => {
    const { nombre, edad, peso, historia } = req.body

    const db = database.getDatabaseInstance();
    const result = db.createPersonaje(nombre, edad, peso, historia);

    result
        .then(data => res.send(data));
})

//edicion de personajes
app.patch('/characters/update/:id', (req, res) => {
    const { nombre, edad, peso, historia } = req.body

    const db = database.getDatabaseInstance();
    const id = req.params.id;
    const result = db.editPersonaje(nombre, edad, peso, historia, id);

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


//PELICULAS
//obtener todos las peliculas
app.get('/movies', (req, res) => {
    const db = database.getDatabaseInstance();
    const result = db.getAllPeliculas(); //const result recibe el resolve/reject del Promise

    result
        .then((datosDevueltos) => res.json(datosDevueltos));
});

//creacion de peliculas
app.post('/movies/insert', (req, res) => {
    const { titulo, fecha_creacion, calificacion} = req.body

    const db = database.getDatabaseInstance();
    const result = db.createPelicula(titulo, fecha_creacion, calificacion);

    result
        .then(data => res.send(data));
})

//edicion de peliculas
app.patch('/movies/update/:id', (req, res) => {
    const {titulo, fecha_creacion, calificacion} = req.body

    const db = database.getDatabaseInstance();
    const id = req.params.id;
    const result = db.editPelicula(titulo, fecha_creacion, calificacion, id);

    result
        .then(data => res.send(data));
})

//eliminado de peliculas
app.delete('/movies/delete/:id', (req, res) => {
    const db = database.getDatabaseInstance();
    const id = req.params.id;
    const result = db.deletePelicula(id);

    result
        .then(data => res.send(data));
})

//---------SERVER RUN-------------
app.listen(process.env.PORT, () => {
    console.log('Corriendo en puerto ' + process.env.PORT);
})