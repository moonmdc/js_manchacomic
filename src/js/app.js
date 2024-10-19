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
        "Somingo": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
    }

    const openHour = timeTable[daySelected]

    if (openHour) {
        for (let i = 0; i < openHour.length; i++) { //agregar las horas al select
            const option = document.createElement('option')
            option.value = openHour[i]
            option.text = openHour[i]
            //option.classList.add(closeHour[i])
            openingTime.appendChild(option)
        }
    }

    const closingTime = document.getElementById('closeHour');
    closingTime.innerHTML = '<option selected disabled value="">-- Selecciona la hora de cierre --</option>';

    openingTime.addEventListener('change', () => {
        const selectedOpeningHour = openingTime.value;

        closingTime.innerHTML = '<option selected disabled value="">-- Selecciona la hora de cierre --</option>';
        const closeHour = openHour.filter(hour => hour > selectedOpeningHour);

        if (closeHour) {
            for (let i = 0; i < closeHour.length; i++) {
                const option = document.createElement('option');
                option.value = closeHour[i];
                option.text = closeHour[i];
                //option.classList.add(closeHour[i])
            
                closingTime.appendChild(option);
            }
        }
    });

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

    const days = ['Viernes', 'Sábado', 'Domingo'];
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
    const name = activity.clase
    const dayA = activity.dia
    const openH = activity.horaA
    const closeH = activity.hora

    for (let i = openH; i < closeH; i++) {
        const cell = document.querySelector(`.${dayA}-${i}`);

        if (cell) {

            const activityButton = document.createElement('button');
            activityButton.innerText = name;
            activityButton.classList.add('activity-button');

            
            cell.appendChild(activityButton);
        }
    }

}

const activityForm = () => {
    const typeActivity = document.getElementById('typeActivity');
    const place = document.getElementById('place');
    const day = document.getElementById('day');
    const openHour = document.getElementById('openHour');
    const closeHour = document.getElementById('closeHour');

    //orden de ejecucion

    // 1º limpiamos los mensajes de errror anteriors
    clearErrorMessages();

    // mediante la funcion validateForm comprobamos que los campos tengan contenido si es correcto crea la actividad y la almacena en el localStorage
    if (validateForm()) {
        const newActivity = new ActivityClass(
            typeActivity.value,
            place.value,
            day.value,
            openHour.value,
            closeHour.value
        );
        saveActivity(newActivity);
        showActivity(newActivity);
        // Limpiar el formulario después de guardar
        document.querySelector('form').reset();
    }
}

const validateForm = () => {

    let isValid = true;

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

    if (closeHour.value === "") {
        showErrorMessage(closeHour, "Por favor, selecciona una hora de cierre");
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
