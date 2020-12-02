import { response } from 'express';
import { deleteDiscountCode, executeQuery, saveDiscountCode, updateDiscountCode } from '../elastic';
import { StoreConfiguration } from 'black-market-model';

const esb = require('elastic-builder'); // the builder

export interface ConfigurationController {
    updateConfiguration: Function
}

export var controller: ConfigurationController = {
    updateConfiguration: (req: any, res: any) => updateConfiguration(req, res)
}

function updateConfiguration(req, res) {
    //Recoger los parámetros por post
    var config: StoreConfiguration = req.body
    if (config) {
        const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('email', user.email))
        executeQuery(requestBody.toJSON()).then(result => {
            var actualUser = result.body.hits.hits[0];
            if (actualUser) {
                updateUser(actualUser._id, user).then(() => {
                    return res.status(200).send({
                        response: true
                    });
                }, error => {
                    console.log(error)
                })
            } else {
                return res.status(200).send({
                    status: 'error',
                    message: 'No existe el id'
                });
            }
        })
    } else {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar'
        });
    }
}


module.exports = controller;





