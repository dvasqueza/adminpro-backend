/*
 Ruta: /api/todo
*/

const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusquedaTotal, getDocumentosColeccion } = require('../controllers/busquedas.controller');
const  router = Router();

 router.get('/:busqueda', validarJWT, getBusquedaTotal );
 router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion );


module.exports = router;