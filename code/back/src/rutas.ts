import { UserController } from './controllers/user.controller'
import { ProductController } from './controllers/product.controller'
import { ImageController } from './controllers/image.controller'

var UserController: UserController = require('./controllers/user.controller')
var ProductController: ProductController = require('./controllers/product.controller')
var ImageController: ImageController = require('./controllers/image.controller')

var express = require('express');
var router = express.Router();

//Rutas para Imagenes
router.post('/images/upload', ImageController.upload)
router.get('/images/:id', ImageController.get)

//Rutas para Usuarios
router.post('/user', UserController.create)
router.get('/users', UserController.getAll)
router.get('/user/:email', UserController.getByEmail)
router.delete('/user/:email', UserController.deleteByEmail)
router.post('/updateUser', UserController.update)
router.post('/logIn', UserController.logIn)

//Rutas para Productos
router.post('/product', ProductController.add)
router.get('/products', ProductController.getAll)
router.get('/product/:ref', ProductController.getProductByRef)
router.delete('/product/:ref', ProductController.deleteByRef)
router.post('/updateProduct', ProductController.update)

router.get('/', function (req, res, next) {
    res.sendFile('index.html', { root: __dirname })
});

module.exports = router;