import { response } from 'express';
import { deleteDiscountCode, executeQuery, saveDiscountCode, updateDiscountCode } from '../elastic';
import { DiscountCode } from '../models/discountCode';
import { ObjectType } from '../models/enum';
import { MarketHeadersInformation } from '../models/marketHeaderInformation';
import { MarketTabsInformation } from '../models/marketTabsInformation';

const esb = require('elastic-builder'); // the builder

export interface ConfigurationController {
    createTabs: Function,
    createHeader: Function,
    updateTabs: Function,
    updateHeader: Function,
}

export var controller: ConfigurationController = {
    createTabs: (req: any, res: any) => createTabs(req, res),
    createHeader: (req: any, res: any) => createHeader(req, res),
    updateTabs: (req: any, res: any) => updateTabs(req, res),
    updateHeader: (req: any, res: any) => updateHeader(req, res)
}


function createTabs(req, res) {
    //Recoger los parámetros por post
    var tabs: MarketTabsInformation = req.body
    // _getUserByEmail(user.email).then((response: any) => {
    //     if (response?.body?.hits?.hits?.length > 0) {
    //         res.status(400).send('Ya existe un usuario registrado con este email.');
    //     } else {
    //         saveUser(user).then(() => {
    //             return res.status(201).send(user)
    //         }, (error: any) => {
    //             return res.status(400).send(error);
    //         })
    //     }
    // }, (error: any) => {
    //     return res.status(400).send(error);
    // })

}

function createHeader(req, res) {
    //Recoger los parámetros por post
    var header: MarketHeadersInformation = req.body
    // _getUserByEmail(user.email).then((response: any) => {
    //     if (response?.body?.hits?.hits?.length > 0) {
    //         res.status(400).send('Ya existe un usuario registrado con este email.');
    //     } else {
    //         saveUser(user).then(() => {
    //             return res.status(201).send(user)
    //         }, (error: any) => {
    //             return res.status(400).send(error);
    //         })
    //     }
    // }, (error: any) => {
    //     return res.status(400).send(error);
    // })

}

function updateTabs(req, res) {
    //Recoger los parámetros por post
    var tabs: MarketTabsInformation = req.body
    if (tabs) {
        // const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('email', user.email))
        // executeQuery(requestBody.toJSON()).then(result => {
        //     var actualUser = result.body.hits.hits[0];
        //     if (actualUser) {
        //         updateUser(actualUser._id, user).then(() => {
        //             return res.status(200).send({
        //                 response: true
        //             });
        //         }, error => {
        //             console.log(error)
        //         })
        //     } else {
        //         return res.status(200).send({
        //             status: 'error',
        //             message: 'No existe el id'
        //         });
        //     }
        // })
    } else {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar'
        });
    }
}

function updateHeader(req, res) {
    //Recoger los parámetros por post
    var header: MarketHeadersInformation = req.body
    if (header) {
        // const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('email', user.email))
        // executeQuery(requestBody.toJSON()).then(result => {
        //     var actualUser = result.body.hits.hits[0];
        //     if (actualUser) {
        //         updateUser(actualUser._id, user).then(() => {
        //             return res.status(200).send({
        //                 response: true
        //             });
        //         }, error => {
        //             console.log(error)
        //         })
        //     } else {
        //         return res.status(200).send({
        //             status: 'error',
        //             message: 'No existe el id'
        //         });
        //     }
        // })
    } else {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar'
        });
    }
}


module.exports = controller;





