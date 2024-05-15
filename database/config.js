const mongoose = require('mongoose');
require('dotenv').config; // para traer variables de entorno

const dbConection = async ()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
            // userNewUrlParser: true,
            // userUnifiedTopology: true,
            // userCreateIndex: true
        });
        console.log('BD Online');
    } catch (error) {
        console.log(error);        
        throw new Error('Error al conectarse a la base de datos');
    }
}
module.exports = {
    dbConection
}