// Agregar nuevas tareas
const formulario = document.getElementById("formTarea");
const inputTitulo = document.getElementById("inputTitulo");
const selectTag = document.getElementById("selectTag");
const listaTareas = document.getElementById("listaTareas");
const filtros = document.querySelectorAll(".chip");
const inputBuscar = document.getElementById("inputBuscar");
const btnLimpiarBuscar = document.getElementById("btnLimpiarBuscar");
const statTotal = document.getElementById("statTotal");
const statVisibles = document.getElementById("statVisibles");
const statFavs = document.getElementById("statFavs");
let filtroActivo = "all";


// Escuchar el envío del formulario
formulario.addEventListener("submit", function(e) {

    e.preventDefault();

    // obtener datos del formulario
    const titulo = inputTitulo.value;
    const categoria = selectTag.value;

    // crear nueva tarea
    const nuevaTarea = document.createElement("li");

    nuevaTarea.classList.add("card");

    nuevaTarea.setAttribute("data-id", Date.now());
    nuevaTarea.setAttribute("data-tag", categoria);
    nuevaTarea.setAttribute("data-fav", "0");

    // contenido de la tarjeta
    nuevaTarea.innerHTML = `
    <div class="card__head">
        <span class="badge">${categoria}</span>
        <div class="actions">
            <button class="icon" type="button" data-action="fav">☆</button>
            <button class="icon" type="button" data-action="done">✓</button>
            <button class="icon danger" type="button" data-action="del">🗑</button>
        </div>
    </div>

    <p class="card__title">${titulo}</p>
    `;

    // agregar tarea a la lista
    listaTareas.appendChild(nuevaTarea);
    actualizarEstadisticas();

    // limpiar campo
    inputTitulo.value = "";
});


// Manipulación de tareas (eliminar, completar, favoritas)
listaTareas.addEventListener("click", function(e) {

    // Eliminar tareas
    if (e.target.dataset.action === "del") {

        const tarjeta = e.target.closest(".card");
        tarjeta.remove();
        actualizarEstadisticas();

    }

    // Marcar como completada
    if (e.target.dataset.action === "done") {

        const tarjeta = e.target.closest(".card");
        tarjeta.classList.toggle("done");

    }

    // Marcar como favorita
    if (e.target.dataset.action === "fav") {

        const tarjeta = e.target.closest(".card");
        const boton = e.target;

        const esFavorita = tarjeta.dataset.fav === "1";

        if (esFavorita) {

            tarjeta.dataset.fav = "0";
            boton.textContent = "☆";

        } else {

            tarjeta.dataset.fav = "1";
            boton.textContent = "★";

        }
actualizarEstadisticas();
    }
    

});


// Filtrar por categoría
filtros.forEach(function(boton){

    boton.addEventListener("click", function(){

        const filtro = boton.dataset.filter;
        filtroActivo = filtro;
        const tareas = document.querySelectorAll(".card");

        // cambiar botón activo
        filtros.forEach(b => b.classList.remove("is-active"));
        boton.classList.add("is-active");

        tareas.forEach(function(tarea){

            const categoria = tarea.dataset.tag;
            const favorita = tarea.dataset.fav === "1";

            if (filtro === "all") {

                tarea.style.display = "block";

            } 
            else if (filtro === "fav") {

                tarea.style.display = favorita ? "block" : "none";

            } 
            else {

                tarea.style.display = categoria === filtro ? "block" : "none";

            }
        });
actualizarEstadisticas();

    });

});

// Buscar por texto
inputBuscar.addEventListener("input", function(){

    const texto = inputBuscar.value.toLowerCase();
    const tareas = document.querySelectorAll(".card");

    tareas.forEach(function(tarea){

        const titulo = tarea.querySelector(".card__title").textContent.toLowerCase();
        const categoria = tarea.dataset.tag;
        const favorita = tarea.dataset.fav === "1";

        let coincideFiltro = false;

        if (filtroActivo === "all") {
            coincideFiltro = true;
        } 
        else if (filtroActivo === "fav") {
            coincideFiltro = favorita;
        } 
        else {
            coincideFiltro = categoria === filtroActivo;
        }

        const coincideTexto = titulo.includes(texto);

        if (coincideFiltro && coincideTexto) {
            tarea.style.display = "block";
        } else {
            tarea.style.display = "none";
        }

    });
actualizarEstadisticas();
});

// Limpiar búsqueda
btnLimpiarBuscar.addEventListener("click", function(){

    // borrar texto
    inputBuscar.value = "";

    // volver a aplicar filtro activo
    const tareas = document.querySelectorAll(".card");

    tareas.forEach(function(tarea){

        const categoria = tarea.dataset.tag;
        const favorita = tarea.dataset.fav === "1";

        if (filtroActivo === "all") {

            tarea.style.display = "block";

        } 
        else if (filtroActivo === "fav") {

            tarea.style.display = favorita ? "block" : "none";

        } 
        else {

            tarea.style.display = categoria === filtroActivo ? "block" : "none";

        }

    });
actualizarEstadisticas();
});

// Actualizar estadísticas
function actualizarEstadisticas(){

    const tareas = document.querySelectorAll(".card");

    let total = tareas.length;
    let visibles = 0;
    let favoritas = 0;

    tareas.forEach(function(tarea){

        if (tarea.style.display !== "none") {
            visibles++;
        }

        if (tarea.dataset.fav === "1") {
            favoritas++;
        }

    });

    statTotal.textContent = total;
    statVisibles.textContent = visibles;
    statFavs.textContent = favoritas;

}
actualizarEstadisticas();