require('dotenv').config(); // para traer variables de entorno

// importar express para levantar un servidor
const express = require('express');
const { dbConection } = require('./database/config');
const cors = require('cors');

// crear o definir el servidor express
const app = express();
// console.log(process.env); // lista las variables de entorno

//premitir CORS
app.use(cors());

//lectura y parseo de body requests
app.use( express.json() );

//Base de datos
dbConection();

//paara redirigir a la ruta donde se ejecutará el servicio
app.use('/api/users', require('./routes/users')); 
app.use('/api/login', require('./routes/auth') );
app.use('/api/hospital', require('./routes/hospital') );
app.use('/api/medicos', require('./routes/medicos') );
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/upload'));



//inicializar servidor
app.listen(process.env.PORT, ()=>{

    console.log("Hi there Dave from port: " + process.env.PORT);
});

