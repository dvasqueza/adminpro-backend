/*
 Ruta: /api/users
*/

const {Router} = require('express');
const { getUsers, postUser, putUser, deleteUser } = require('../controllers/users.controller');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('', validarJWT, getUsers);
router.post('',[
    check('userName',' field is required').not().isEmpty(), //validaciones con express-validator
    check('email',' field is required and must be a valid email').isEmail(),//validaciones con express-validator
    check('password',' field is required').not().isEmpty(),//validaciones con express-validator
    validarCampos
], postUser);
router.put('/:id',[
    validarJWT,
    check('userName',' field is required').not().isEmpty(), //validaciones con express-validator
    check('email',' field is required and must be a valid email').isEmail(),//validaciones con express-validator
    check('role',' role is required').not().isEmpty(),//validaciones con express-validator
    validarCampos
],
 putUser);
 router.delete('/:id', validarJWT,  deleteUser);
router.get('/:id', getUsers);

module.exports = router;