//cargar listado
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:4000/movies')
        .then(response => response.json())
        .then(datosDevueltos => loadLista(datosDevueltos));
})

//llenar lista
function loadLista(datos) {
    const listapel = document.querySelector('#listapeliculas')

    let listadopeliculas = "";

    datos.forEach(({ id_pelicula, titulo, calificacion }) => {
        listadopeliculas += `<ul id="numero${id_pelicula}">${id_pelicula} Titulo: ${titulo} Calificacion: ${calificacion}
        <button class="deletepelicula" id="btnEliminar" data-id=${id_pelicula}>Eliminar
        <button class="editpelicula" id="btnEditar" data-id=${id_pelicula}>Editar</ul>`;
    });

    listapel.innerHTML = listadopeliculas;
}

//llenar personajes--------------
//cargar listado
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:4000/characters')
        .then(response => response.json())
        .then(datosDevueltos => loadListaPers(datosDevueltos));
})

//llenar lista
function loadListaPers(datos) {
    const listaper = document.querySelector('#listapersonajes');

    let listadopersonajes = "";

    datos.forEach(({ id_personaje, nombre, edad }) => {
        listadopersonajes += `<input type="checkbox" id="numero${id_personaje}">${id_personaje} - ${nombre}</ul>`;
    });

    listaper.innerHTML = listadopersonajes;
}

//completar

//cargar pelicula nueva
const cargarPeliculaButton = document.querySelector('#enviar');

cargarPeliculaButton.onclick = function (e) {
    e.preventDefault()

    const titulo = document.querySelector('#titulo').value;
    const fecha = document.querySelector('#fecha').value;
    const calificacion = document.querySelector('#calificacion').value;

    //const personajes = document.querySelector('#personajes').value;

    const bodyToSend = {
        titulo,
        fecha,
        calificacion
    }

    fetch('http://localhost:4000/movies/insert', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            //'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(bodyToSend)
    })
        .then(function () {
            location.reload();
        });
}

//eliminar pelicula 
function eliminarPelicula(id) {
    fetch('http://localhost:4000/movies/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(function () {
            location.reload();
        })
        ;

}

document.querySelector('#listapeliculas').addEventListener('click', function (event) {
    if (event.target.id === "btnEliminar") {
        eliminarPelicula(event.target.dataset.id)
    }
})

//editar pelicula
var selectedId;

document.querySelector('#listapeliculas').addEventListener('click', function (event) {
    if (event.target.id === "btnEditar") {
        var unselect = document.getElementsByClassName('selected');
        while (unselect.length) {
            unselect[0].classList.remove('selected');
        }
        document.getElementById('numero' + event.target.dataset.id).classList.add('selected');
        document.getElementById('editarpeliculas').classList.remove('oculto');
        selectedId = event.target.dataset.id;
    }       
})

editarPeliculaButton = document.querySelector('#actualizar');

editarPeliculaButton.onclick = function (e) {
    e.preventDefault()

    const titulo = document.querySelector('#edittitulo').value;
    const fecha = document.querySelector('#editfecha').value;
    const calificacion = document.querySelector('#editcalificacion').value;

    //const personajes = document.querySelector('#editpersonajes').value;

    const bodyToSend = {
        titulo,
        fecha,
        calificacion
    }

    fetch('http://localhost:4000/movies/update/' + selectedId, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            //'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(bodyToSend)
    })
        .then(function () {
            location.reload();
        });
}