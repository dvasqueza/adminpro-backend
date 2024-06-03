const { response } = require('express');
const Hospital = require('../models/hospital.model');
const User = require('../models/user.model');
const Medico = require('../models/medico.model');


const getBusquedaTotal = async ( req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regExp = new RegExp( busqueda, 'i' );

    const [users, hospitals, medicos ] = await Promise.all([
        User.find({ userName: regExp }),
        Hospital.find({ name: regExp }),
        Medico.find({ name: regExp }),
    ])

    return res.status(200).json({
        ok:true,
        msj:`Hii there ${req.params.busqueda} `,
        users: users,
        hospitals: hospitals,
        medicos: medicos
    });
}

const getDocumentosColeccion = async ( req, res = response ) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regExp = new RegExp( busqueda, 'i' );
    let data =[];

    switch (tabla) {
        case 'user':
            data = await User.find({ userName: regExp });
            break;
        case 'hospital':
            data = await Hospital.find({ name: regExp })
                                .populate('hospitalId','name')
                                .populate('user','userName');
            break;
        case 'medico':
            data = await Medico.find({ name: regExp })
                        .populate('user','userName email');
            break;
    
        default:
            return res.status(200).json({
                ok:true,
                msj:`no se encontro colleccion   `,
                colleccion: data
            });
    }

    res.status(200).json({
        ok:true,
        msj:`collection  ${req.params.tabla} value searched: ${req.params.busqueda}  `,
        colleccion: data
    });
}

module.exports = {
    getBusquedaTotal,
    getDocumentosColeccion
}