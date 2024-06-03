const Hospital = require('../models/hospital.model');
const {response} = require('express');


const getHospitals = async (req, res=response) =>{

    try {
        const hospitalslist = await Hospital.find()
                                            .populate('user','userName email');
            return res.json({
                ok: true,
                hospitales: hospitalslist,
            });
        
    } catch (error) {
        return res.json({
            ok: true,
            msg: "Error al obtener Hospitales"
        });
    }
};

const postHospital = async (req, res = response) =>{
    const uid = req.uid;

    const { name, img} = req.body;    

    try {
        const hospitalExist = await Hospital.findOne({ name });
        if (hospitalExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al guardar usuario: User already exists'
            });
        }

        const hospital = new Hospital(
            {
                user: uid,
                ...req.body
            }
        );
       

        await hospital.save();
        res.json({
            ok: true,
            hospital: hospital,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al guardar hospital'
        });
    }

};


const putHospital = async( req, res = response ) =>{
    const uid = req.params.id;
    try {
        const hospital = await Hospital.findById(uid);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Error no se encontro hospital'
            });
        }
        hospital.name = req.body.name
        // //actualizaciones
         const hospitalUpdated = await Hospital.findByIdAndUpdate(uid, hospital, {new:true}); //{new:true} que traiga los nuevos datos
        
        res.status(200).json({
            ok: true,
            hospital: hospitalUpdated
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar hospital'
        });
    }
}

const deleteHospital = (async (req, res = response) =>{
    const uid = req.params.id
    try {
        // const userExist = await User.findById(uid);
        // if( !userExist ){
        //     return res.status(404).json({
        //         ok: false,
        //         msg: 'Error User not exist'
        //     });
        // }
        // await User.findByIdAndDelete(uid);
        
        return res.status(200).json({
            ok:true,
            msj: 'User deleted'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
});

module.exports = {
    getHospitals,
    postHospital,
    putHospital,
    deleteHospital
}