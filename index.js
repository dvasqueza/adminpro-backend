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

//Base de datos
dbConection();

//Rutas
app.get('/', (req, res)=>{
    res
    .status(202)
    .json({
        ok: true,
        msj: 'Hi there'
    });
}
)

//inicializar servidor
app.listen(process.env.PORT, ()=>{

    console.log("Hi there Dave from port" + process.env.PORT);
});

