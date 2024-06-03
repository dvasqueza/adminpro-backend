const Medico = require('../models/medico.model');
const {response} = require('express');


const getMedicos = async (req, res=response) =>{
    try {
        const medicosList = await Medico.find()
                                        .populate('hospitalId','name')
                                        .populate('user','userName');
            return res.json({
                ok: true,
                medicos: medicosList,
            });
        
    } catch (error) {
        return res.json({
            ok: true,
            msg: 'Error al listar Medicos'
        });
    }
};

const postMedico = async (req, res = response) =>{
    const uid = req.uid;

    const { name, img} = req.body;    

    try {
        const medicoExist = await Medico.findOne({ name });
        if (medicoExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al guardar medico: medico already exists'
            });
        }

        const medico = new Medico(
            {
                user: uid,
                ...req.body
            }
        );
       

        await medico.save();
        res.json({
            ok: true,
            medico: medico,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al guardar medico'
        });
    }

};


const putMedico = async( req, res = response ) =>{
    const uid = req.params.id;
    try {
        const medicoExists = await User.findById(uid);
        if (!medicoExists) {
            return res.status(404).json({
                ok: false,
                msg: 'Error no se encontro medico'
            });
        }

       // const {password, google, email, ...campos} = req.body;
       

        // campos.email = email;

        // //actualizaciones
        // const userUpdated = await User.findByIdAndUpdate(uid, campos, {new:true}); //{new:true} que traiga los nuevos datos
        
        res.status(200).json({
            ok: true,
            //user: userUpdated
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
}

const deleteMedico = (async (req, res = response) =>{
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
    getMedicos,
    postMedico,
    putMedico,
    deleteMedico
}