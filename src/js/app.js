import { ActivityClass } from "../classes/activity";

const collectActivities = () => {
    return JSON.parse(localStorage.getItem('activities'))
}

let activities = collectActivities()

if (activities == null) activities = []

const showHour = () => {
    const daySelected = document.getElementById('day').value //preguntar
    const openingTime = document.getElementById('openHour')

    openingTime.innerHTML = '<option value="">-- Selecciona la hora de apertura --</option>'; //limpiar lo anterior

    const timeTable = {
        "viernes": ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        "sabado": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        "domingo": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
    }

    const openHour = timeTable[daySelected]

    if (openHour) {
        for (let i = 0; i < openHour.length; i++) { //agregar las horas al select
            const option = document.createElement('option')
            option.value = openHour[i]
            option.text = openHour[i]
            openingTime.appendChild(option)
        }
    }

    const closingTime = document.getElementById('closeHour');
    closingTime.innerHTML = '<option value="">-- Selecciona la hora de cierre --</option>';

    openingTime.addEventListener('change', () => {
        const selectedOpeningHour = openingTime.value;

        closingTime.innerHTML = '<option value="">-- Selecciona la hora de cierre --</option>';
        const closeHour = openHour.filter(hour => hour > selectedOpeningHour);

        if (closeHour) {
            for (let i = 0; i < closeHour.length; i++) {
                const option = document.createElement('option');
                option.value = closeHour[i];
                option.text = closeHour[i];
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

    place.innerHTML = '<option value="">-- Selecciona un lugar --</option>';

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


const activityForm = () => {
    const newActivity = new ActivityClass(
        document.getElementById('typeActivity').value,
        document.getElementById('place').value,
        document.getElementById('day').value,
        document.getElementById('openHour').value,
        document.getElementById('closeHour').value
    );
    saveActivity(newActivity);

}
document.addEventListener('submit', (e) => { activityForm() })

const createTable = () => {
    const tBody = document.getElementById('activityTable')

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
    tBody.appendChild(thead)

    const days = ['Viernes', 'Sábado', 'Domingo'];
    const tbody = document.createElement('tBody');

    days.forEach(day => {
        const row = document.createElement('tr');

        // Primera celda con el nombre del día
        const dayName = document.createElement('td');
        dayName.innerText = day;
        row.appendChild(dayName);

        // Celdas vacías para cada hora del día
        for (let i = startHour; i <= endHour; i++) {
            const eachHour = document.createElement('td');
            eachHour.classList.add(`${day}-${i}`);  // Clase para identificar las celdas por día y hora
            row.appendChild(eachHour);
        }

        tBody.appendChild(row);
    });

    table.appendChild(tbody);

}
createTable()


