import { response } from 'express';
import { executeQuery, updateConfig, saveConfig, getConfig } from '../elastic';
import { StoreConfiguration } from 'black-market-model';

const esb = require('elastic-builder'); // the builder

export interface ConfigurationController {
    getConfiguration: Function
    upsert: Function
}

export var controller: ConfigurationController = {
    getConfiguration: (req: any, res: any) => getConfiguration(req, res),
    upsert: (req: any, res: any) => upsert(req, res)
}


function getConfiguration(req, res) {

    const requestBody = new esb.RequestBodySearch()
    .query(new esb.MatchPhraseQuery('type', "4"))

    getConfig(requestBody).then(((response: any) => {
        var config: StoreConfiguration
        if (response?.body?.hits?.hits?.length > 0) {
            config = response.body.hits.hits[0]._source
        }
        return res.status(200).send(config);
    }), (error: any) => {
        return res.status(400).send(error);
    })
}

function upsert(req, res) {
    //Recogemos el objeto
    var config: StoreConfiguration = req.body
    //Control de errores
    if (config != undefined) {
        var boolQuery = new esb.boolQuery()
            .must(new esb.MatchPhraseQuery('type', 4))

        const requestBody = new esb.requestBodySearch().query(boolQuery);
         executeQuery(requestBody.toJSON()).then(result => { 
            var actualConfig = result.body.hits.hits[0];
            if (actualConfig) {
                updateConfig(actualConfig._id, config).then(() => {
                    return res.status(200).send({
                        response: actualConfig
                    })
                }, error => {
                    console.log(error)
                })
            } else {
                //Guardar
                saveConfig(config).then(() => {
                    return res.status(200).send({
                        response: config
                    })
                }, error => {
                    console.log(error)
                })
            }
        }, (error: any) => {
            return res.status(400).send(error);
        })
    } else {
        return res.status(400).send('Configuración no introducida.')
    }

}


module.exports = controller;





