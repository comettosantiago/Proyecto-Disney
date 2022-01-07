//cargar listado
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:4000/characters')
        .then(response => response.json())
        .then(datosDevueltos => loadLista(datosDevueltos));
})

//llenar lista
function loadLista(datos) {
    const listaper = document.querySelector('#listapersonajes');

    let listadopersonajes = "";

    datos.forEach(({ id_personaje, nombre, edad }) => {
        listadopersonajes += `<ul id="numero${id_personaje}">${id_personaje} Nombre: ${nombre} Edad: ${edad}
        <button class="deletepersonaje" id="btnEliminar" data-id=${id_personaje}>Eliminar
        <button class="editpersonaje" id="btnEditar" data-id=${id_personaje}>Editar</ul>`;
    });

    listaper.innerHTML = listadopersonajes;
}



//cargar personaje nuevo
const cargarPersonajeButton = document.querySelector('#enviar');

cargarPersonajeButton.onclick = function (e) {
    e.preventDefault()

    const nombre = document.querySelector('#nombre').value;
    const edad = document.querySelector('#edad').value;
    const peso = document.querySelector('#peso').value;
    const historia = document.querySelector('#historia').value;

    const bodyToSend = {
        nombre,
        edad,
        peso,
        historia,
    }

    console.log(bodyToSend.nombre);

    fetch('http://localhost:4000/characters/insert', {
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

//eliminar personaje 
function eliminarPersonaje(id) {
    fetch('http://localhost:4000/characters/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(function () {
            location.reload();
        })
        ;

}

document.querySelector('#listapersonajes').addEventListener('click', function (event) {
    if (event.target.id === "btnEliminar") {
        eliminarPersonaje(event.target.dataset.id)
    }
})

//editar personaje //COMPLETAR
var selectedId;

document.querySelector('#listapersonajes').addEventListener('click', function (event) {
    if (event.target.id === "btnEditar") {
        var unselect = document.getElementsByClassName('selected');
        while (unselect.length) {
            unselect[0].classList.remove('selected');
        }
        document.getElementById('numero' + event.target.dataset.id).classList.add('selected');
        document.getElementById('editarpersonajes').classList.remove('oculto');
        selectedId = event.target.dataset.id;
    }
})

editarPersonajeButton = document.querySelector('#actualizar');

editarPersonajeButton.onclick = function (e) {
    e.preventDefault()

    const nombre = document.querySelector('#editnombre').value;
    const edad = document.querySelector('#editedad').value;
    const peso = document.querySelector('#editpeso').value;
    const historia = document.querySelector('#edithistoria').value;

    const bodyToSend = {
        nombre,
        edad,
        peso,
        historia,
    }

    fetch('http://localhost:4000/characters/update/' + selectedId, {
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