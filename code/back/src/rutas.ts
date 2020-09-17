import { UserController } from './controllers/user.controller'
var UserController: UserController = require('./controllers/user.controller')

var express = require('express');
var router = express.Router();

//Rutas para Usuarios
router.post('/user', UserController.add)
//router.get('/users', UserController.test)
router.get('/user/:id', UserController.getById)
//router.delete('/user:id', UserController.datosCurso)


module.exports = router;