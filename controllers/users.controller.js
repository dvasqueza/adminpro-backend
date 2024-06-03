const User = require('../models/user.model');
const {response} = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsers = async (req, res = response) =>{
    const desde = Number(req.query.desde) || 0;

    const [usersList, count] = await Promise.all([ //promise.all ejecuta varias instrucciones asincronas al mismo tiempo
         User.find({}, 'userName email role google img ')
             .skip(desde)
             .limit( 5 ),
                                    
         User.countDocuments()
        ]);
                                
    res.json({
        ok: true,
        users: usersList,
        count: count
    });
};

const postUser = async (req, res = response) =>{

    const {email, userName, password} = req.body;    

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al guardar usuario: User already exists'
            });
        }

        const user = new User(req.body);

        //encriptar password
        const salt = bcrypt.genSaltSync(10);
        console.log('salt '+ salt);
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        //generar el token
        const token = await generarJWT(user.id);
        res.json({
            ok: true,
            user: user,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al guardar usuario'
        });
    }

};


const putUser = async( req, res = response ) =>{
    const uid = req.params.id;
    try {
        const userExist = await User.findById(uid);
        if (!userExist) {
            return res.status(404).json({
                ok: false,
                msg: 'Error no se encontro usuario'
            });
        }

        const {password, google, email, ...campos} = req.body;
        if (userExist.email !== email) {
            const emailAlreadyExist = await User.findOne({ email: email });
            if (emailAlreadyExist) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al actualizar usuario el Email ya existe para otro usuario'
                });
            }
        }

        campos.email = email;

        //actualizaciones
        const userUpdated = await User.findByIdAndUpdate(uid, campos, {new:true}); //{new:true} que traiga los nuevos datos
        
        res.status(200).json({
            ok: true,
            user: userUpdated
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
}

const deleteUser = (async (req, res = response) =>{
    const uid = req.params.id
    try {
        const userExist = await User.findById(uid);
        if( !userExist ){
            return res.status(404).json({
                ok: false,
                msg: 'Error User not exist'
            });
        }
        await User.findByIdAndDelete(uid);
        
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
    getUsers,
    postUser,
    putUser,
    deleteUser
}