//  Agregar nuevas tareas
const formulario = document.getElementById("formTarea");
const inputTitulo = document.getElementById("inputTitulo");
const selectTag = document.getElementById("selectTag");
const listaTareas = document.getElementById("listaTareas");

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