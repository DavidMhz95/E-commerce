import { response } from 'express';
import { executeQuery, updateConfig, saveConfig } from '../elastic';
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

        var boolQuery = new esb.boolQuery()
            .must(new esb.MatchPhraseQuery('type', 4))

       const requestBody = new esb.requestBodySearch().query(boolQuery);
        
        executeQuery(requestBody.toJSON()).then(result => {
            var actualConfig = result.body.hits.hits[0];
            if (actualConfig) {
                updateConfig(actualConfig._id, config).then(() => {
                    return res.status(200).send({
                        response: actualConfig
                    });
                }, error => {
                    console.log(error)
                })
            } else {
                saveConfig(config).then(() => {
                    return res.status(200).send({
                        response: config
                    });
                }, error => {
                    console.log(error)
                })
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





