

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

const showTable = () => {
    const bodyTable = document.getElementById('activityTable');

    for (let i = 10; i < 22; i++) {
        const row = document.createElement('tr');
        row.classList.add('horas');

        const hour = document.createElement('td');
        hour.classList.add('hora');
        hour.innerText = `${i}:00 -- ${i + 1}:00`;

        let actividadV = document.createElement('td');
        actividadV.classList.add(`viernes-${i}`);
        let actividadS = document.createElement('td');
        actividadS.classList.add(`sabado-${i}`);
        let actividadD = document.createElement('td');
        actividadD.classList.add(`domingo-${i}`);

        // Usar "row" en lugar de "fila"
        row.appendChild(hour);
        row.appendChild(actividadV);
        row.appendChild(actividadS);
        row.appendChild(actividadD);
        
        // Agregar la fila al cuerpo de la tabla
        bodyTable.appendChild(row);
    }
}

showTable()

