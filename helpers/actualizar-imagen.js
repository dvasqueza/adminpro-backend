const User = require('../models/user.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');
const  fs  = require('fs');
const { Console } = require('console');

const actualizarImagen = async ( coleccion, id, nombreArchivo ) => {
    let retorno = false;
    let pathImagenAnterior = '';
    switch (coleccion) {
        case 'users':
            const user = await User.findById(id);
            //validar que exista el usuario
            if ( !user ) {
                console.log(`User: ${id} doesn t exist`);
                return false;
            }
            pathImagenAnterior = `./uploads/${coleccion}/${user.img}`;
            borrarImagen(pathImagenAnterior)
            user.img = nombreArchivo;
            await user.save();
            retorno = true;
            break;
        case 'medicos':
            const medico = await Medico.findById(id);
            //validar que exista el usuario
            if ( !medico ) {
                console.log(`medico: ${id} doesn t exist`);
                return false;
            }
            pathImagenAnterior = `./uploads/${coleccion}/${medico.img}`;
            borrarImagen(pathImagenAnterior)
            medico.img = nombreArchivo;
            await medico.save();
            retorno = true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            //validar que exista el usuario
            if ( !hospital ) {
                console.log(`hospital: ${id} doesn t exist`);
                return false;
            }
            pathImagenAnterior = `./uploads/${coleccion}/${hospital.img}`;
            borrarImagen(pathImagenAnterior)
            hospital.img = nombreArchivo;
            await hospital.save();
            retorno = true;
            break;
    
        default:
            break;
    }
    return retorno;
}

const borrarImagen = ( path ) => {
    //borrar la imagen anterior
    console.log(`path a borrar: ${path}`);
    if ( fs.existsSync( path ) ) {
        fs.unlinkSync( path )
    }
}

module.exports = {
    actualizarImagen
}