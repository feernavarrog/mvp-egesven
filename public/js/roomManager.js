
// Funciones para realizar operaciones CRUD sobre la tabla habitaciones

// Crear una habitación
async function createRoom() {
    const room = {
        numero_hab: document.getElementById('numero_hab').value,
        info_hab: document.getElementById('info_hab').value,
        equipamiento_hab: document.getElementById('equipamiento_hab').value,
        valor_diario_hab: parseFloat(document.getElementById('valor_diario_hab').value),
        id_ubicacion: parseInt(document.getElementById('id_ubicacion').value, 10),
        id_estado: parseInt(document.getElementById('id_estado').value, 10),
        id_categoria: parseInt(document.getElementById('id_categoria').value, 10)
    };

    const response = await fetch('http://localhost:3000/rooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });

    alert(await response.text());

    window.location.href = '/adminRoomList'; // Redirigir de vuelta a la lista de habitaciones

}

// Obtener una habitación por ID
async function getRoom() {
    const roomId = document.getElementById('roomId').value;

    const requestData = {
        id_habitacion: roomId
    };

    const response = await fetch('http://localhost:3000/rooms/getRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    } else {
        document.getElementById('result').innerText = 'Error al obtener habitación';
    }
}

// Actualizar una habitación
async function updateRoom() {
    const roomId = document.getElementById('roomId').value;
    const room = {
        id_habitacion: roomId,
        numero_hab: document.getElementById('numero_hab').value,
        info_hab: document.getElementById('info_hab').value,
        equipamiento_hab: document.getElementById('equipamiento_hab').value,
        valor_diario_hab: parseFloat(document.getElementById('valor_diario_hab').value),
        id_ubicacion: parseInt(document.getElementById('id_ubicacion').value, 10),
        id_estado: parseInt(document.getElementById('id_estado').value, 10),
        id_categoria: parseInt(document.getElementById('id_categoria').value, 10)
    };

    const response = await fetch('http://localhost:3000/rooms/updateRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });

    alert(await response.text());

    window.location.href = '/adminRoomList'; // Redirigir de vuelta a la lista de habitaciones

}

// Eliminar una habitación
async function deleteRoom() {
    const roomId = document.getElementById('roomId').value;

    const requestData = {
        id_habitacion: roomId
    };

    const response = await fetch('http://localhost:3000/rooms/deleteRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    });

    alert(await response.text());
}

async function getAllRoomsREM() {
    const response = await fetch('http://localhost:3000/rooms/getRooms');
    const rooms = await response.json();
    
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';  // Limpiar la tabla

    rooms.forEach(room => {
        const row = `
            <tr>
                <td>${room[1]}</td>
                <td>${room[8]}</td>
                <td>${room[4]}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteRoomREM(${room[0]})">ELIMINAR</button>
                    <button class="btn btn-success" onclick="editRoom(${room[0]}, '${room[1]}', '${room[2]}', '${room[3]}', '${room[4]}', '${room[5]}', '${room[6]}', '${room[7]}', '${room[8]}')">EDITAR</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

async function getAllRoomsForClient() {
    const response = await fetch('http://localhost:3000/rooms/getRooms');
    const rooms = await response.json();
    
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';  // Limpiar la tabla

    rooms.forEach(room => {
        const row = `
            <tr>
                <td>${room[1]}</td>
                <td>${room[8]}</td>
                <td>${room[4]}</td>
                <td>
                    <button class="btn btn-success" onclick="viewRoom(${room[0]}, '${room[1]}', '${room[2]}', '${room[3]}', '${room[4]}', '${room[5]}', '${room[6]}', '${room[7]}', '${room[8]}')">IR A HABITACION</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Eliminar una habitacion
async function deleteRoomREM(roomId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta habitacion?')) {
        const requestData = {
            id_habitacion: roomId
        };
        console.log(roomId);

        const response = await fetch('http://localhost:3000/rooms/deleteRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        console.log(response);

        alert(await response.text());
        getAllRoomsREM(); // Actualiza la lista de habitaciones
    }
}

// Editar una habitacion
function editRoom(id,numero,info,equipamiento,valor,ubicacion,estado,categoria,nombreCategoria) {
    // Llenar los campos del formulario con los datos del usuario a editar 
    window.location.href = `/adminRoomForm?id=${id}&numero=${numero}&info=${info}&equipamiento=${equipamiento}&valor=${valor}&ubicacion=${ubicacion}&estado=${estado}&categoria=${categoria}&nombreCategoria=${nombreCategoria}`;
}

// ver una habitacion
function viewRoom(id,numero,info,equipamiento,valor,ubicacion,estado,categoria,nombreCategoria) {
    // Llenar los campos del formulario con los datos del usuario a editar 
    window.location.href = `/roomSpecs?id=${id}&numero=${numero}&info=${info}&equipamiento=${equipamiento}&valor=${valor}&ubicacion=${ubicacion}&estado=${estado}&categoria=${categoria}&nombreCategoria=${nombreCategoria}`;
}

//! Funcion no creada Reservar una Habitacion
// Crear una habitación
async function reserveRoom() {
    const room = {
        numero_hab: document.getElementById('numero_hab').value,
        info_hab: document.getElementById('info_hab').value,
        equipamiento_hab: document.getElementById('equipamiento_hab').value,
        valor_diario_hab: parseFloat(document.getElementById('valor_diario_hab').value),
        id_ubicacion: parseInt(document.getElementById('id_ubicacion').value, 10),
        id_estado: parseInt(document.getElementById('id_estado').value, 10),
        id_categoria: parseInt(document.getElementById('id_categoria').value, 10)
    };

    console.log(room);
}
