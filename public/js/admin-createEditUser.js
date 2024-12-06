// Función para obtener los parámetros de la URL
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        id: urlParams.get('id'),
        nombre: urlParams.get('nombre'),
        correo: urlParams.get('correo'),
        clave: urlParams.get('clave'),
        apellido: urlParams.get('apellido'),
        tipo_usuario: urlParams.get('tipo_usuario')
    };
}

// Poblar los campos del formulario con los datos del usuario
function populateForm() {
    const params = getQueryParams();
    if (params.id) {
        document.getElementById('createBtn').style.display = 'none';
        document.getElementById('titleBar').innerText = 'Actualizar usuario';

        document.getElementById('userId').value = params.id;
        document.getElementById('nombre').value = params.nombre;
        document.getElementById('correo').value = params.correo;
        document.getElementById('clave').value = params.clave;
        document.getElementById('apellido').value = params.apellido;
        document.getElementById('tipo_usuario').value = params.tipo_usuario;
    } else {
        document.getElementById('titleBar').innerText = 'Crear usuario';
        document.getElementById('updateBtn').style.display = 'none';
    }
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', populateForm);