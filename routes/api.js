const express = require("express")
const router = express.Router()
const apiController = require("../controllers/apiController")
const validarID = require('../middlaware/validarID')
const {check} = require('express-validator')
const auth = require('../middlaware/auth')
const validarJWT = require('../middlaware/validarToken')

/*
router.get('/',apiController.lista)
router.post('/', apiController.crear)
router.put('/',apiController.editar)
*/

router.get('/saludo', apiController.saludo)
router.get('/user', apiController.user)
router.get('/ver', apiController.lista)
router.get('/ver/:id',validarID ,apiController.listaUnica)
// metodo http - exprecion - middleware - callback
router.post('/crear', [
    check('name').not().isEmpty().withMessage('el campo name es obligatorio').isLength({min:3, max: 24}).withMessage('el campo name debe tener mas de 3 caracteres pero menos de 24'),
    check('price').not().isEmpty().withMessage('el campo price es obligatorio'),
    check('stock').not().isEmpty().withMessage('el campo stock es obligatorio'),
    check('brand').not().isEmpty().withMessage('el campo brand es obligatorio').isLength({min:3, max: 14}).withMessage('el campo brand debe tener mas de 3 caracteres pero menos de 14'),
    check('category').not().isEmpty().withMessage('el campo category es obligatorio').isLength({min:5, max: 14}).withMessage('el campo category debe tener mas de 5 caracteres pero menos de 14'),
] ,apiController.crear)
router.put('/editar/:id',validarID ,[
    check('name').not().isEmpty().withMessage('el campo name es obligatorio para editar el producto').isLength({min:3, max: 24}).withMessage('el campo name debe tener mas de 3 caracteres pero menos de 24'),
    check('price').not().isEmpty().withMessage('el campo price es obligatorio para editar el producto'),
    check('stock').not().isEmpty().withMessage('el campo stock es obligatorio para editar el producto'),
    check('brand').not().isEmpty().withMessage('el campo brand es obligatorio para editar el producto').isLength({min:3, max: 14}).withMessage('el campo brand debe tener mas de 3 caracteres pero menos de 14'),
    check('category').not().isEmpty().withMessage('el campo category es obligatorio para editar el producto').isLength({min:5, max: 14}).withMessage('el campo category debe tener mas de 5 caracteres pero menos de 14'),
],apiController.editar)
router.delete('/borrar/:id',validarID ,apiController.eliminar)
router.get('/session', apiController.crearSession)
router.get('/pruebasession',auth,apiController.pruebaSession)
router.get('/cerrar',apiController.eliminarSession)
router.get('/pass', apiController.ejemploPass)
router.post('/probartoken', apiController.pruebaToken)
router.get('/test', validarJWT,apiController.testToken)



router.post('/login',[
    check('email').not().isEmpty().withMessage('el campo email es obligatorio'),
    check('password').not().isEmpty().withMessage('el campo password es obligatorio')
],apiController.login)
router.post('/logintoken',[
    check('email').not().isEmpty().withMessage('el campo email es obligatorio'),
    check('password').not().isEmpty().withMessage('el campo password es obligatorio')
],apiController.loginToken)

router.delete('/logout',apiController.logout)


module.exports = router