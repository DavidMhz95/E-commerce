'use script'

var express = require('express');
var UserController = require('./controllers/user.controller')

var router = express.Router();
// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './upload/articles' });

//Rutas para Usuarios
router.get('/test-de-controlador', UserController.test);
router.post('/user', UserController.save)
router.get('/users', UserController.test)
router.get('/user:id',UserController.test)
//router.delete('/user:id', UserController.datosCurso)


module.exports = router;