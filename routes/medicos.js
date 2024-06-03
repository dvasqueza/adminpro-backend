/*
 Ruta: /api/medicos
*/

const {Router} = require('express');

const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, postMedico, putMedico, deleteMedico } = require('../controllers/medicos.controller');

const router = Router();

router.get('/', validarJWT, getMedicos);
router.post('',[
    validarJWT,
    check('name',' field is required').not().isEmpty(), //validaciones con express-validator
    check('hospitalId',' hospitalId must be a valid one').isMongoId(), //validaciones con express-validator
    validarCampos
], postMedico);
router.put('/:id',[
    validarJWT,
    check('name',' field is required').not().isEmpty(), //validaciones con express-validator
    check('img',' field is required ').not().isEmpty(),//validaciones con express-validator
    validarCampos
],
 putMedico);
 router.delete('/:id', validarJWT,  deleteMedico);
router.get('/:id', getMedicos);

module.exports = router;