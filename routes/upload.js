const { Router } = require('express');
const { fileUpload, retornarImagen } = require('../controllers/upload.controller');
const expressFileUpload = require('express-fileupload');

const router = Router();

router.use( expressFileUpload() );

router.put('/:coleccion/:id', fileUpload);
router.get('/:coleccion/:nombreImagen', retornarImagen);

module.exports = router;