/*
 Ruta: /api/hospital
*/

const {Router} = require('express');

const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitals, postHospital, putHospital, deleteHospital } = require('../controllers/hospital.controller');

const router = Router();

router.get('/', validarJWT, getHospitals);
router.post('',[
    validarJWT,
    check('name',' field is required').not().isEmpty(), //validaciones con express-validator
    check('hospitalId',' field is required').not().isEmpty(), //validaciones con express-validator
    validarCampos
], postHospital);
router.put('/:id',[
    validarJWT,
    check('name',' field is required').not().isEmpty(), //validaciones con express-validator
    check('img',' field is required').not().isEmpty(),//validaciones con express-validator
    validarCampos
],
 putHospital);
 router.delete('/:id', validarJWT,  deleteHospital);
router.get('/:id', getHospitals);

module.exports = router;