

const formulario = document.getElementById("formContacto");

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    mostrarNotificacion(
        "success",
        "Consulta enviada",
        "Su consulta ha sido enviada correctamente."
    );

    formulario.reset();

});

function mostrarNotificacion(tipo, titulo, mensaje){

    let notificacion = document.getElementById("notificacion");
    let icono = document.getElementById("iconoNotificacion");
    let tituloNotificacion = document.getElementById("tituloNotificacion");
    let texto = document.getElementById("textoNotificacion");

    notificacion.className = "notificacion";
    notificacion.classList.add(tipo);

    tituloNotificacion.innerText = titulo;
    texto.innerText = mensaje;

    if(tipo == "success"){
        icono.innerHTML = "✔";
        icono.style.color = "#32a762";
    }
    else if(tipo == "error"){
        icono.innerHTML = "✖";
        icono.style.color = "#D32F2F";
    }
    else{
        icono.innerHTML = "⚠";
        icono.style.color = "#ff9800";
    }

    notificacion.classList.add("mostrar");

    setTimeout(function(){

        notificacion.classList.remove("mostrar");

    },3000);

}