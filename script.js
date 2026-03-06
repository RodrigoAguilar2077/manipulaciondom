// Agregar nuevas tareas
const formulario = document.getElementById("formTarea");
const inputTitulo = document.getElementById("inputTitulo");
const selectTag = document.getElementById("selectTag");
const listaTareas = document.getElementById("listaTareas");
const filtros = document.querySelectorAll(".chip"); // ← ESTA LÍNEA FALTABA


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

    // limpiar campo
    inputTitulo.value = "";
});


// Manipulación de tareas (eliminar, completar, favoritas)
listaTareas.addEventListener("click", function(e) {

    // Eliminar tareas
    if (e.target.dataset.action === "del") {

        const tarjeta = e.target.closest(".card");
        tarjeta.remove();

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

    }

});


// Filtrar por categoría
filtros.forEach(function(boton){

    boton.addEventListener("click", function(){

        const filtro = boton.dataset.filter;
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

    });

});