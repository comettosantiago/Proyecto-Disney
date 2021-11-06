//---------------------------------------------
//--------------------API----------------------
//---------------------------------------------
const { response } = require('express');
const express = require('express');
const app = express();
const database = require('./database');


//--------MIDDLEWARES-------------
app.use(express.json());

//---------SERVER RUN-------------
app.listen(process.env.PORT, () => {
    console.log('Corriendo en puerto ' + process.env.PORT);
})

//--------------RUTAS---------------

//----------PARA PERSONAJES---------
//obtener todos los personajes
app.get('/characters', (req, res) => {
    const db = database.getDatabaseInstance();
    const result = db.getAllPersonajes(); //const result recibe el resolve/reject del Promise

    result
        .then((datosDevueltos) => res.json(datosDevueltos));
});

//creacion de personajes
const personaje = [
    null,
    'Debby Ryan',
    28,
    55,
    'Deborah Ann Ryan​​, conocida como Debby Ryan, es una actriz y cantante estadounidense.​'
]

app.post('/characters/insert', (req, res) => {
    const db = database.getDatabaseInstance();
    const result = db.createPersonaje(personaje);

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

