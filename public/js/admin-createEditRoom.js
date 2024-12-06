// Función para obtener los parámetros de la URL
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        id: urlParams.get('id'),
        numero: urlParams.get('numero'),
        info: urlParams.get('info'),
        equipamiento: urlParams.get('equipamiento'),
        valor: urlParams.get('valor'),
        ubicacion: urlParams.get('ubicacion'),
        estado: urlParams.get('estado'),
        categoria: urlParams.get('categoria'),
        nombreCategoria: urlParams.get('nombreCategoria')
    };
}

// Poblar los campos del formulario con los datos del usuario
function populateForm() {
    const params = getQueryParams();
    if (params.id) {
        document.getElementById('createBtn').style.display = 'none';
        document.getElementById('titleBar').innerText = 'Actualizar Habitacion';

        document.getElementById('roomId').value = params.id;
        document.getElementById('numero_hab').value = params.numero;
        document.getElementById('info_hab').value = params.info;
        document.getElementById('equipamiento_hab').value = params.equipamiento;
        document.getElementById('valor_diario_hab').value = params.valor;
        document.getElementById('id_ubicacion').value = params.ubicacion;
        document.getElementById('id_estado').value = params.estado;
        document.getElementById('id_categoria').value = params.categoria;
    } else {
        document.getElementById('titleBar').innerText = 'Crear Habitacion';
        document.getElementById('updateBtn').style.display = 'none';
    }
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', populateForm);