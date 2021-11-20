//-------------------------------------------
//----------------FRONTEND-------------------
//-------------------------------------------

//cargar listado
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:4000/characters')
        .then(response => response.json())
        .then(datosDevueltos => loadLista(datosDevueltos));
})

//llenar lista
function loadLista(datos) {
    const listaper = document.querySelector('#listapersonajes');
    const listapel = document.querySelector('#listapeliculas')

    let listadopersonajes = "";
    let listadopeliculas = "";

    datos.forEach(({ id_personaje, nombre, edad }) => {
        listadopersonajes += `<ul>${id_personaje} Nombre: ${nombre} Edad: ${edad} 
        <button class="deletepersonaje" id="btnEliminar" data-id=${id_personaje}>Eliminar</ul>`;
    });

    datos.forEach( ({}) => {
        listadopeliculas;
    })

    listaper.innerHTML = listadopersonajes;
}



//cargar personaje
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
function eliminarPersonaje(id){
    fetch('http://localhost:4000/characters/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json());
}

document.querySelector('#listapersonajes').addEventListener('click', function(event) {
    if (event.target.id === "btnEliminar") {
        eliminarPersonaje(event.target.dataset.id)//que hago?
    }
})

