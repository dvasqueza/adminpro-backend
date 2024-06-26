const jwt = require('jsonwebtoken');


const generarJWT = ( uid ) =>{

    return new Promise ( (resolve, reject ) =>{

        const payload ={
            uid,
        }
        jwt.sign( payload , process.env.JWT_SECRET,
        {
            expiresIn: '8h'
        }, ( err, token) =>{
            if (err) {
                console.log(err);
                reject('Error al generar kwt')
            }else{
                resolve(token)
            }
        }
        );

    });

};


module.exports = {
    generarJWT
};