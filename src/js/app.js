const daySelected = document.getElementById('day').value
const hourSelect = document.getElementById('hour')

const showHour = () => {   
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

document.getElementById('day').addEventListener('change', showHour);
    // Agregar el evento "change" al select de día para ejecutar showHour al cambiar


