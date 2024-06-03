const {response} = require('express');
const path = require('path');
const  fs  = require('fs');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async( req, res = response) => {

    const {coleccion, id } = req.params;

    //validar que traiga una coleccion valida
    const coleccionesValidas = ['users','medicos','hospitales'];
    if ( !coleccionesValidas.includes(coleccion) ) {
        return res.status(400).json({
            ok: false,
            msj: `la coleccion: ${coleccion} no es valida colecciones validas: users,medicos,hospitales `
        })
    }

    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No files were uploaded.'
            });
    }

    //procesar imagen
    //req.files.imagen  ---> asi se accede a la imagen 'imagen' es como yo envio parametro desde el cliente
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1];
    //validar extensiones de imagen
    const extensionesValidas = ['png','jpg','jpeg', 'gif'];
    if ( !extensionesValidas.includes(extensionArchivo) ) {
        return res.status(400).json({
            ok: false,
            msj: `el archivo: ${coleccion} no es permitido, archivos permitidos: png, jpg ,jpeg, gif `
        })
    }

    //generar nombre unico
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    const path = `./uploads/${ coleccion }/${ nombreArchivo }`;
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if ( err ) {
            return res.status(500).json({
                ok:false,
                msj:`error al guardar la imagen en la ruta: ${path}`
             });
        }
    });

    //actualizar imagen
    actualizarImagen(coleccion, id, nombreArchivo);
    
    res.status(200).json({
        ok: true,
        msj:`se ha subido a la  coleccion: ${coleccion} id: ${id}  nombre archivo ${nombreArchivo} en la carpeta: ./uploads/${ coleccion }/`
    })
}

const retornarImagen = (req, res = response) => {
    const {coleccion, nombreImagen } = req.params;

    const pathImg = path.join( __dirname, `../uploads/${coleccion}/${nombreImagen}`);

    //si no existe img enviar una por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    }
    else {
        const defaultPathImg = path.join( __dirname, `../uploads/img_not_found.jpg`);
        res.sendFile( defaultPathImg );
    }
}

module.exports = {
    fileUpload,
    retornarImagen
}