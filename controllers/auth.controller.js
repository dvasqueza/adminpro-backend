const {response} = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const doLogin = ( async(req, res = response)=>{

    try {
        console.log('Has Entrado al Login')
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if ( !user ) {
            return res.status(400).json({
                ok:false,
                msj: 'error'
            });
        }
        if ( !bcrypt.compareSync( password, user.password ) ) { //funcion compara las password que el usuario ingreso VS la encriptada que esta en la BD ]
            return res.status(400).json({
                ok:false,
                msj: 'error 2'
            });
        }
        //generar el token
        const token = await generarJWT(user.id);
        return res.status(200).json({
            ok:true,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msj: 'Contactar al administrador'
        });
    }
});


const googleSignIn = ( async(req, res = response)=>{

    try {
        const {email, name, picture} = await googleVerify( req.body.token )
        // console.log(req.body);
        const user = await User.findOne({email});
        let usuario;

        if ( !user ) {
            console.log('Nuevo Usuario por Google');
            usuario = new User({
                userName: name,
                email,
                password: '@@@',
                img: picture,
                role: 'USER_ROLE',
                google:true

            })
        }else{
            console.log('Usuario auth por google ya existente');
            usuario = user;
            usuario.google = true
        }
        //guardar usuario
        await user.save();

        //generar el token
        const token = await generarJWT(user.id);

        return res.status(200).json({
            ok:true,
            email, name, picture,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msj: 'Contactar al administrador fallo al consumir token de google'
        });
    }

});


module.exports = {
    doLogin,
    googleSignIn
}