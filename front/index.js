//bottones
    function cambiarSeccion(){

        var seccionPersonajes = document.getElementById('tablapersonajes');
        var seccionPeliculas = document.getElementById('tablapeliculas');
        var personajeButton = document.getElementById('selectpersonajes');
        var peliculaButton = document.getElementById('selectpeliculas');

        personajeButton.onclick = function(){
            seccionPersonajes.setAttribute('style', 'visibility: visible; opacity:1');
            seccionPeliculas.setAttribute('style', 'visibility: hidden; opacity:0');
        }

        peliculaButton.onclick = function(){
            seccionPeliculas.setAttribute('style', 'visibility: visible; opacity:1');
            seccionPersonajes.setAttribute('style', 'visibility: hidden; opacity:0');
        }

    }




