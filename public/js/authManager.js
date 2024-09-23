async function login() {
    // Capturar los valores del formulario
    var correo = document.getElementById('correo').value;
    var clave = document.getElementById('clave').value;

    // Crear un objeto con los datos del usuario
    const user = {
        correo_electronico: correo,
        clave_usuario: clave
    };

    // Llamar a la ruta del servidor para obtener el usuario
    try {
        const response = await fetch('http://localhost:3000/users/getUserByEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo_usuario: correo })
        });

        if (response.ok) {
            const usuario = await response.json();

            // Verificar si la clave es correcta y el tipo de usuario, redirigir al panel correspondiente 
            var tipoUsuarioDB = usuario[5];
            var usuarioDB = usuario[1];
            var claveDB = usuario[2];
        
            
            if (claveDB === clave) {
                if(tipoUsuarioDB === 1){
                    // Redirigir a la página principal o panel de admin
                    window.location.href = '/panel-admin';
                } else if(tipoUsuarioDB === 3){
                    // Redirigir a la página principal o panel de usuario
                    window.location.href = '/client-catalog';
                } else {
                    alert('Usuario no encontrado');
                }
            } else {
                alert('Contraseña incorrecta');
            }
        } else if (response.status === 404) {
            alert('Usuario no encontrado');
        } else {
            alert('Error en el servidor');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un problema con la conexión al servidor');
    }
}

//FUNCION QUE VERIFICA validarRegistro Y LLAMA A createUser SI ES EXITOSA
function validarYCrearUsuario() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const clave = document.getElementById('clave').value;

    if (validarRegistro(nombre, apellido, correo, clave)) {
        createUser(); // Llama a la función createUser si la validación es exitosa
        window.location.href = '/login';
    }
}

//FUNCION QUE VALIDA QUE NO SEAN NULOS
function validarRegistro(nombre, apellido, correo, clave) {
    if (nombre === '' || apellido === '' || correo === '' || clave === '') {
        alert('Todos los campos son obligatorios');
        return false;
    }

    return true;
}