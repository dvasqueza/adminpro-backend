const { response } = require("express")
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    const token = req.header('Authorization');
    //console.log(token);
    if ( !token ) {
      return res.status(401).json({
        ok: false,
        msg: 'there is not a token in the request'
      }); 
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        console.log(uid);
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
          }); 
    }

    next();
}

module.exports = {
    validarJWT,
}