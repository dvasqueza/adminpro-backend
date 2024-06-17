const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { doLogin, googleSignIn } = require('../controllers/auth.controller');

const router = Router();

router.post('/',[
    check('email','field must be a valid email').isEmail(),//validaciones con express-validator
    check('password',' password is required').not().isEmpty(),//validaciones con express-validator
    validarCampos
],
doLogin
);

router.post('/google',[
    check('token',' token is mandatory ').not().isEmpty(),//validaciones con express-validator
    validarCampos
],
googleSignIn
);






module.exports = router;