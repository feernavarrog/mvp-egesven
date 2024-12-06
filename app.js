const express = require('express');
const cors = require('cors');
const path = require('path');
const database = require('./src/services/database');
const userRoutes = require('./src/routes/userRoutes');
const roomRoutes = require('./src/routes/roomRoutes');

const app = express();

// Configuraciones
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

//! INTENTAR SOLO SERVIR PUBLIC
// Servir archivos estáticos desde 'node_modules'
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


//! Nuevas rutas ( en ingles ) definidas finales

app.use('/users', userRoutes); // Rutas de usuarios
app.use('/rooms', roomRoutes); // Rutas de habitaciones

app.get('/', (req, res) => {res.render('viewLogin');});  // Ruta inicial 
app.get('/newLogin', (req, res) => {res.render('viewLogin');}); // Ruta de login 
app.get('/newRegister', (req, res) => {res.render('viewRegister');});  // Ruta de registro
app.get('/newHome', (req, res) => {res.render('viewHome');}); // Ruta de home
app.get('/adminPannel', (req, res) => {res.render('viewAdminPannel');}); // Ruta de panel de administrador 
app.get('/adminUserList', (req, res) => {res.render('viewAdminUserList');}); // Ruta de lista de usuarios
app.get('/adminRoomList', (req, res) => {res.render('viewAdminRoomList');}); // Ruta de lista de habitaciones
app.get('/adminUserForm', (req, res) => {res.render('viewAdminCreateEditUser');}); // Ruta de formulario de usuario CRUD
app.get('/adminRoomForm', (req, res) => {res.render('viewAdminCreateEditRoom');}); // Ruta de formulario de habitacion CRUD
app.get('/clientCatalog', (req, res) => {res.render('viewClientCatalog');}); // Ruta de catalogo de habitaciones
app.get('/roomSpecs', (req, res) => {res.render('viewClientRoomSpecs');}); // Ruta de especificaciones de habitacion

//Ruta a pagina no encontrada
app.use((req, res, next) => {res.status(404).render('notFound');});


// Inicializar la base de datos
database.initialize();

// Manejador de señales para cierre adecuado de la base de datos
process.on('SIGINT', () => {
  database.close().then(() => {
    console.log('Base de datos cerrada correctamente');
    process.exit(0);
  }).catch(err => {
    console.error('Error al cerrar la base de datos:', err);
    process.exit(1);
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Backend is running on http://localhost:3000');
});
