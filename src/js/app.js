const showHour = () => {   
    const daySelected = document.getElementById('day').value //preguntar
    const hourSelect = document.getElementById('hour')

    hourSelect.innerHTML = '<option value="">-- Selecciona una hora --</option>'; //limpiar lo anterior

    const timeTable = {
        "viernes": ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        "sabado": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        "domingo": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
    }

    
    const hour = timeTable[daySelected] 

    if (hour) {
        for (let i = 0; i < hour.length; i++) { //agregar las horas al select
            const option = document.createElement('option')
            option.value = hour[i]
            option.text = hour[i]
            hourSelect.appendChild(option)
        }
    }
  
}

document.getElementById('day').addEventListener('change', showHour)

const showPlace = () =>{
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



