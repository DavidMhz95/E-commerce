import { UserController } from './controllers/user.controller'
var UserController: UserController = require('./controllers/user.controller')

var express = require('express');
var router = express.Router();

//Rutas para Usuarios
router.post('/user', UserController.add)
router.get('/users', UserController.getAll)
router.get('/user/:email', UserController.getUserByEmail)
router.delete('/user/:email', UserController.deleteByEmail)
router.post('/updateUser', UserController.update)

//Rutas para Productos
router.post('/product', UserController.add)
router.get('/products', UserController.getAll)
router.get('/user/:ref', UserController.getUserByEmail)
router.delete('/user/:ref', UserController.deleteByEmail)
router.post('/updateProduct', UserController.update)


module.exports = router;