import { ActivityClass } from "../classes/activity";

const collectActivities = () => {
    return JSON.parse(localStorage.getItem('activities'))
}

let activities = collectActivities()// hola
if (activities == null) activities = []

const showHour = () => {
    const daySelected = document.getElementById('day').value //preguntar
    const openingTime = document.getElementById('openHour')

    openingTime.innerHTML = '<option selected disabled value="">-- Selecciona la hora de apertura --</option>'; //limpiar lo anterior

    const timeTable = {
        "Viernes": ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        "Sabado": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        "Domingo": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
    }

    const openHour = timeTable[daySelected]

    if (openHour) {
        for (const element of openHour) { //agregar las horas al select
            const option = document.createElement('option')
            option.value = element
            option.text = element
            //option.classList.add(closeHour[i])
            openingTime.appendChild(option)
        }
    }


}
document.getElementById('day').addEventListener('change', showHour)

const showPlace = () => {
    const activity = document.getElementById('typeActivity').value
    const place = document.getElementById('place')

    const places = {
        lugar1: "Jardines del Prado",
        lugar2: "Antiguo Casino",
        lugar3: "Cueva"
    }

    place.innerHTML = '<option selected disabled value="">-- Selecciona un lugar --</option>';

    const activityPlaces = {
        charla: [places.lugar2, places.lugar3],
        taller: [places.lugar2, places.lugar3],
        juegoMesa: [places.lugar1],
        wargame: [places.lugar2, places.lugar3],
        rolSr: [places.lugar2, places.lugar3]
    };

    const possiblePlaces = activityPlaces[activity];

    if (possiblePlaces) {
        possiblePlaces.forEach((placeName) => {
            const option = document.createElement('option');
            option.value = placeName;
            option.text = placeName;
            place.appendChild(option);  // Agrega la opción al select
        });
    }
}
document.getElementById('typeActivity').addEventListener('change', showPlace)



const saveActivity = (activity) => {
    // Asumiendo que 'activities' es un array previamente definido
    activities.push(activity);
    localStorage.setItem('activities', JSON.stringify(activities));
}

const createTable = () => {
    const table = document.getElementById('activityTable')

    const startHour = 10;
    const endHour = 22;

    const thead = document.createElement('tHead');
    const headerRow = document.createElement('tr');

    const day = document.createElement('th')
    day.innerText = 'Dia'
    headerRow.appendChild(day)
    
    for (let i = startHour; i <= endHour; i++) {
        const hourCell = document.createElement('th');
        hourCell.innerText = `${i}:00`;
        headerRow.appendChild(hourCell);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead)

    const days = ['Viernes', 'Sabado', 'Domingo'];
    const tbody = document.createElement('tBody');

    days.forEach(day => {
        const row = document.createElement('tr');
        row.setAttribute('id', 'row-tr');

        // Primera celda con el nombre del día
        const dayName = document.createElement('td');
        dayName.innerText = day;
        row.appendChild(dayName);

        // Celdas vacías para cada hora del día
        for (let i = startHour; i <= endHour; i++) {
            const container = document.createElement('div');
            container.classList.add(`container-${day}-${i}:00`)
            container.setAttribute('id', 'containerActivities')
            

            const eachHour = document.createElement('td');
            eachHour.classList.add(`${day}-${i}:00`);  // Clase para identificar las celdas por día y hora
            
            eachHour.appendChild(container);
            row.appendChild(eachHour);

        }

        tbody.appendChild(row);
    });
    table.appendChild(tbody);

}
createTable()

const showActivity = (activity) => {
    const name = activity.nombre
    const dayA = activity.dia
    const openH = activity.horaA
    const closeH = activity.horaC
    const place = activity.lugar
    const type = activity.clase

    const lugarColores = {
        "Jardines del Prado": "bg-success",  
        "Antiguo Casino": "bg-info",         
        "Cueva": "bg-danger"                 
    };

    const colorClass = lugarColores[place]

    for (let i = openH; i < closeH; i++) {
        const cell = document.getElementsByClassName(`container-${dayA}-${i}`);

        if (cell) {
            const activityButton = document.createElement('button');
            activityButton.innerText = name;
            activityButton.classList.add('activity-button');
            activityButton.classList.add('btn')
            activityButton.classList.add(colorClass)


            activityButton.setAttribute('id', 'botonActividades') 
            activityButton.setAttribute('data-bs-toggle', 'modal')
            activityButton.setAttribute('data-bs-target', '#activityModal') 
            activityButton.setAttribute('draggable', 'true')

            //insertar en el boton la informacion de la actividad
            activityButton.dataset.name = name;
            activityButton.dataset.day = dayA;
            activityButton.dataset.openHour = openH;
            activityButton.dataset.place = place;
            activityButton.dataset.type = type;

            activityButton.addEventListener('click', showActivityDetails);

            cell[0].appendChild(activityButton) 
        }
    }
}

const showActivityDetails = (event) => {
    const button = event.target;
    const modalTitle = document.querySelector('#activityModal .modal-title');
    const modalBody = document.querySelector('#activityModal .modal-body');

    modalTitle.textContent = button.dataset.name;
    modalBody.innerHTML = `
        <p><strong>Nombre de la actividad:</strong> ${button.dataset.name}</p>
        <p><strong>Tipo de actividad:</strong> ${button.dataset.type}</p>
        <p><strong>Día:</strong> ${button.dataset.day}</p>
        <p><strong>Hora de inicio:</strong> ${button.dataset.openHour}</p>
        <p><strong>Lugar:</strong> ${button.dataset.place}</p>
    `;
}

const showActivities = () => {
    activities.forEach(activity => {
        showActivity(activity)
    })
}

showActivities()

const mostrarMensajeError = (mensaje) => {
    console.log("Mostrando mensaje de error:", mensaje); // Añade este log
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-danger';
    errorDiv.textContent = mensaje;
    const form = document.querySelector('form');
    form.insertBefore(errorDiv, form.lastChild);
}

const validarCapacidadLugar = (nuevaActividad) => {
    const capacidadPorLugar = {
        "Jardines del Prado": 5,
        "Antiguo Casino": 10,
        "Cueva": 2
    };

    const actividadesEnMismoTiempo = activities.filter(actividad => 
        actividad.dia === nuevaActividad.dia &&
        actividad.horaA === nuevaActividad.horaA &&
        actividad.lugar === nuevaActividad.lugar
    );

    const capacidadDisponible = capacidadPorLugar[nuevaActividad.lugar] - actividadesEnMismoTiempo.length;

    if (capacidadDisponible > 0) {
        nuevaActividad.numeroSala = actividadesEnMismoTiempo.length + 1;
        return true;
    } else {
        mostrarMensajeError(`No hay capacidad disponible en ${nuevaActividad.lugar} para este horario.`);
        return false;
    }
}

const activityForm = () => {
    const activityName = document.getElementById('activityName');
    const typeActivity = document.getElementById('typeActivity');
    const place = document.getElementById('place');
    const day = document.getElementById('day');
    const openHour = document.getElementById('openHour');
2
    //orden de ejecucion
    // 1º limpiamos los mensajes de errror anteriors
    clearErrorMessages();
    // mediante la funcion validateForm comprobamos que los campos tengan contenido si es correcto crea la actividad y la almacena en el localStorage
    if (validateForm()) {
        const newActivity = new ActivityClass(
            activityName.value,
            typeActivity.value,
            place.value,
            day.value,
            openHour.value,
2
        );
        if (validarCapacidadLugar(newActivity)) {
            saveActivity(newActivity);
            showActivity(newActivity);
            // Limpiar el formulario después de guardar
            document.querySelector('form').reset();
        }
    }
}

const validateForm = () => {
    let isValid = true;

    if (activityName.value.trim() === "") {
        showErrorMessage(activityName, "Por favor, introduce un nombre para la actividad");
        isValid = false;
    } else if (activityName.value.length > 20) {
        showErrorMessage(activityName, "El nombre no puede superar los 20 caracteres");
        isValid = false;
    }
    
    if (typeActivity.value === "") {
        showErrorMessage(typeActivity, "Por favor, selecciona una actividad");
        isValid = false;
    } 

    if (place.value === "") {
        showErrorMessage(place, "Por favor, selecciona un lugar");
        isValid = false;
    }

    if (day.value === "") {
        showErrorMessage(day, "Por favor, selecciona un día");
        isValid = false;
    }

    if (openHour.value === "") {
        showErrorMessage(openHour, "Por favor, selecciona una hora de apertura");
        isValid = false;
    }


    return isValid

}

const showErrorMessage = (element, message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-danger';
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);
}

const clearErrorMessages = () => {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    activityForm();
});


const draggable = document.querySelectorAll('#botonActividades');
const contenedor = document.querySelectorAll('#containerActivities');

let divAlmacenado = null;

draggable.forEach(div => {
      div.addEventListener('dragstart', (event) =>{
          div.classList.add('dragging');
          divAlmacenado = div;
          console.log(div);

          event.dataTransfer.effectAllowed = "move"

      });

      div.addEventListener('dragend', () =>{
          div.classList.remove('dragging');
          divAlmacenado = null;
      });
});

// Permitir el evento 'dragover' en el contenedor
contenedor.forEach(container =>{

    container.addEventListener('dragover', (event) => {
        event.preventDefault(); // Necesario para permitir el drop y mover el elemento
        const afterElement = getDragAfterElement(container, event.clientY);
        const draggingElement = document.querySelector('.dragging');

        // Inserta el elemento arrastrado antes del div correcto o al final si no hay ningún div después
        if (afterElement == null) {
          container.appendChild(draggingElement);
        } else {
          container.insertBefore(draggingElement, afterElement);
        }
      });

      container.addEventListener('drop', (event) => {
        event.preventDefault();
        const draggingElement = document.querySelector('.dragging');
        if (draggingElement) {
            actualizarFechaYHora(draggingElement, container);
            
            location.reload();//refrescar la pagina
        }
    });
})


  // coge el div que está después de  donde se arrastra
  const getDragAfterElement = (contenedor, y) => {
      const draggableElements = [...contenedor.querySelectorAll('.draggable:not(.dragging)')];

      return draggableElements.find(child => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        return offset < 0;
      });
  }

  const actualizarFechaYHora = (elemento, nuevoContenedor) => {
    const claseContenedor = nuevoContenedor.classList[0];
    const [dia, hora] = claseContenedor.split('-').slice(1);
    
    let nuevaHora = hora;
    if (dia === 'Viernes' && parseInt(hora) < 17) { 
        nuevaHora = '17:00';
    }

    // Actualizar los datos del elemento
    elemento.dataset.day = dia;
    elemento.dataset.openHour = nuevaHora;

    // Actualizar la actividad en el array y localStorage
    const actividadIndex = activities.findIndex(act => act.nombre === elemento.dataset.name);
    if (actividadIndex !== -1) {
        activities[actividadIndex].dia = dia;
        activities[actividadIndex].horaA = nuevaHora;
        localStorage.setItem('activities', JSON.stringify(activities));
    }

    // Actualizar el texto del botón si es necesario
    actualizarTextoBoton(elemento);
}

const actualizarTextoBoton = (elemento) => {
    const modalBody = document.querySelector('#activityModal .modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <p><strong>Nombre de la actividad:</strong> ${elemento.dataset.name}</p>
            <p><strong>Tipo de actividad:</strong> ${elemento.dataset.type}</p>
            <p><strong>Día:</strong> ${elemento.dataset.day}</p>
            <p><strong>Hora de inicio:</strong> ${elemento.dataset.openHour}</p>
            <p><strong>Lugar:</strong> ${elemento.dataset.place}</p>
        `;
    }
}