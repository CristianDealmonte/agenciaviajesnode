import express from 'express';
import router from './routes/index.js'
import db from './config/db.js';



const app = express(); 

// Conectar a la base de datos
db.authenticate()
    .then( () => console.log('base de datos conectada') )
    .catch( error => console.log(error)); 

// Habilitar PUG
app.set('view engine', 'pug'); 

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    return next();
} )

// Definir body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar router
app.use('/', router);

// Definir puerto
const port = process.env.PORT || 4000;

// Iniciar servidor
app.listen(port, () => {
    console.log(`Ele servidor esta funcionanco en el puerto http://localhost:${port}`)
})

