import { UserController } from './controllers/user.controller'
import { ProductController } from './controllers/product.controller'
var UserController: UserController = require('./controllers/user.controller')
var ProductController: ProductController = require('./controllers/product.controller')

var express = require('express');
var router = express.Router();

//Rutas para Usuarios
router.post('/user', UserController.add)
router.get('/users', UserController.getAll)
router.get('/user/:email', UserController.getUserByEmail)
router.delete('/user/:email', UserController.deleteByEmail)
router.post('/updateUser', UserController.update)

//Rutas para Productos
router.post('/product', ProductController.add)
router.get('/products', ProductController.getAll)
router.get('/user/:ref', ProductController.getProductByRef)
router.delete('/user/:ref', ProductController.deleteByRef)
router.post('/updateProduct', ProductController.update)
router.get('/exampleProduct', ProductController.productExample)


module.exports = router;