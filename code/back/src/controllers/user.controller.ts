import express from 'express';
import { executeQuery, saveUser } from '../elastic';
import { queryGenerator, generateDefaultQueryExample } from '../queryGenerator';
import { Dictionary, KeyValuePair, sortKeys } from '../utils';
import {User} from '../models/user'

var router = express.Router()
var validator = require('validator');



var controller = {
    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy el rest del controlador de USUARIOS'
        });
    },
    save: (req, res) => {
        //Recoger los parámetros por post
        var params = req.body;
        console.log(req.body)
        //Validar datos (validator)
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email);
            var validate_hashPassword = !validator.isEmpty(params.hash_password);
            var validate_type = !validator.isEmpty(params.type);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_name && validate_surname && validate_email && validate_hashPassword && validate_type) {
            //Crear objeto a guarda
            saveUser(params).then( ()=>{
                return res.status(200).send({
                    status: 'success',
                    message: 'User guardado'
                });
            },
            error => console.log(error))

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }

    },

    getUsers: (req, res) => {
    
    
    }


};

module.exports = controller;





