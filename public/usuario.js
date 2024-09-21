
// Funciones para realizar operaciones CRUD sobre la tabla de usuarios

// Obtener todos los usuarios
async function getAllUsers() {
    const response = await fetch('http://localhost:3000/usuarios/obtenerUsuarios');
    const users = await response.json();
    console.log(users);
    
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';  // Limpiar la tabla

    users.forEach(user => {
        const row = `
            <tr>
                <td>${user[0]}</td>
                <td>${user[3]}</td>
                <td>${user[1]}</td>
                <td>${user[2]}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Crear un usuario
async function createUser() {
    const user = {
        correo_electronico: document.getElementById('correo').value,
        clave_usuario: document.getElementById('clave').value,
        nombre_usuario: document.getElementById('nombre').value,
        apellido_usuario: document.getElementById('apellido').value,
        id_tipo_usuario: parseInt(document.getElementById('tipo_usuario').value, 10)
    };

    const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    alert(await response.text());
}

// Obtener un usuario por ID
async function getUser() {
    const userId = document.getElementById('userId').value;

    const requestData = {
        id_usuario: userId
    };

    const response = await fetch('http://localhost:3000/usuarios/obtenerUsuario', {
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
        document.getElementById('result').innerText = 'Error al obtener usuario';
    }
}

// Actualizar un usuario
async function updateUser() {
    const userId = document.getElementById('userId').value;
    const user = {
        id_usuario: userId,
        correo_electronico: document.getElementById('correo').value,
        clave_usuario: document.getElementById('clave').value,
        nombre_usuario: document.getElementById('nombre').value,
        apellido_usuario: document.getElementById('apellido').value,
        id_tipo_usuario: parseInt(document.getElementById('tipo_usuario').value, 10)
    };

    const response = await fetch('http://localhost:3000/usuarios/actualizarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    alert(await response.text());
}

// Eliminar un usuario
async function deleteUser() {
    const userId = document.getElementById('userId').value;

    const requestData = {
        id_usuario: userId
    };

    const response = await fetch('http://localhost:3000/usuarios/eliminarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    });

    alert(await response.text());
}

//! Funciones remasterizadas

// usuario.js

async function getAllUsersREM() {
    const response = await fetch('http://localhost:3000/usuarios/obtenerUsuarios');
    const users = await response.json();
    console.log(users);
    
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';  // Limpiar la tabla

    users.forEach(user => {
        const row = `
            <tr>
                <td>${user[0]}</td>
                <td>${user[3]}</td>
                <td>${user[1]}</td>
                <td>${user[2]}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteUserREM(${user[0]})">ELIMINAR</button>
                    <button class="btn btn-warning" onclick="editUser(${user[0]}, '${user[3]}', '${user[1]}', '${user[2]}', '${user[4]}', ${user[5]})">EDITAR</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Eliminar un usuario
async function deleteUserREM(userId) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        const requestData = {
            id_usuario: userId
        };

        const response = await fetch('http://localhost:3000/usuarios/eliminarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        alert(await response.text());
        getAllUsersREM(); // Actualiza la lista de usuarios
    }
}

// Editar un usuario
function editUser(id, nombre, correo, clave, apellido, tipo_usuario) {
    window.location.href = `/admin-updateUser?id=${id}&nombre=${nombre}&correo=${correo}&clave=${clave}&apellido=${apellido}&tipo_usuario=${tipo_usuario}`;
}

// Actualizar un usuario
async function updateUserREM() {
    const userId = document.getElementById('userId').value;
    const user = {
        id_usuario: userId,
        correo_electronico: document.getElementById('correo').value,
        clave_usuario: document.getElementById('clave').value,
        nombre_usuario: document.getElementById('nombre').value,
        apellido_usuario: document.getElementById('apellido').value,
        id_tipo_usuario: parseInt(document.getElementById('tipo_usuario').value, 10)
    };

    const response = await fetch('http://localhost:3000/usuarios/actualizarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    alert(await response.text());
    window.location.href = '/admin-readUser'; // Redirigir de vuelta a la lista de usuarios
}