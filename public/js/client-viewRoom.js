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

// Poblar los campos del formulario con los datos del usuario y actualizar los elementos <p>
function populateForm() {
    const params = getQueryParams();
    if (params.id) {
        document.getElementById('roomId').value = params.id;

        document.getElementById('numero_hab_text').innerText = params.numero;
        document.getElementById('numero_hab').value = params.numero;

        document.getElementById('info_hab_text').innerText = params.info;
        document.getElementById('info_hab').value = params.info;

        document.getElementById('equipamiento_hab_text').innerText = params.equipamiento;
        document.getElementById('equipamiento_hab').value = params.equipamiento;

        document.getElementById('valor_diario_hab_text').innerText = params.valor;
        document.getElementById('valor_diario_hab').value = params.valor;

        // Manejo de ubicacion
        let ubicacionText = '';
        switch (params.ubicacion) {
            case '1':
                ubicacionText = 'Piso 1 - Lobby';
                break;
            case '2':
                ubicacionText = 'Piso 2 - Zona Tranquila';
                break;
            case '3':
                ubicacionText = 'Piso 3 - Vista al Mar';
                break;
            case '4':
                ubicacionText = 'Piso 4 - Piscina';
                break;
            case '5':
                ubicacionText = 'Piso 5 - Suites Ejecutivas';
                break;
            case '6':
                ubicacionText = 'Piso 6 - Área Familiar';
                break;
            case '7':
                ubicacionText = 'Piso 7 - Ático';
                break;
            default:
                ubicacionText = 'Desconocida';
        }
        document.getElementById('id_ubicacion_text').innerText = ubicacionText;
        document.getElementById('id_ubicacion').value = params.ubicacion;

        // Manejo de estado
        let estadoText = '';
        switch (params.estado) {
            case '1':
                estadoText = 'Disponible';
                break;
            case '2':
                estadoText = 'Ocupada';
                break;
            case '3':
                estadoText = 'Mantenimiento';
                break;
            default:
                estadoText = 'Desconocido';
        }
        document.getElementById('id_estado_text').innerText = estadoText;
        document.getElementById('id_estado').value = params.estado;

        // Manejo de categoria
        let categoriaText = '';
        switch (params.categoria) {
            case '1':
                categoriaText = 'Turista';
                break;
            case '2':
                categoriaText = 'Premium';
                break;
            default:
                categoriaText = 'Desconocida';
        }
        document.getElementById('id_categoria_text').innerText = categoriaText;
        document.getElementById('id_categoria').value = params.categoria;
    }
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', populateForm);
