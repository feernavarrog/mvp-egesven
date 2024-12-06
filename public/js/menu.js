const tipoUsuarioDB = sessionStorage.getItem('usuario');

if (tipoUsuarioDB === '1' || tipoUsuarioDB === '2') {
    document.getElementById('adminPannel').style.display = 'block';
} else {
    document.getElementById('adminPannel').style.display = 'none';
};