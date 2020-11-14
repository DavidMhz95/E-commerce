import { response } from 'express';
import { deleteDiscountCode, executeQuery, saveDiscountCode, updateDiscountCode } from '../elastic';
import { DiscountCode } from '../models/discountCode';
import { ObjectType } from '../models/enum';

const esb = require('elastic-builder'); // the builder

export interface DiscountCodeController {
    create: Function,
    getAll: Function,
    check: Function
}

export var controller: DiscountCodeController = {
    create: (req: any, res: any) => create(req, res),
    getAll: (req: any, res: any) => getAll(req, res),
    check: (req: any, res: any) => check(req, res),
}

function _getDiscountCodeByCode(code: string): Promise<any> {
    if (code) {
        var boolQuery = new esb.boolQuery()
            .must(new esb.MatchPhraseQuery('code', code))
            .must(new esb.MatchPhraseQuery('type', ObjectType.DiscountCode))

        const requestBody = new esb.requestBodySearch().query(boolQuery)
        // Build the request body      
        return executeQuery(requestBody.toJSON())
    }
}

function check(req, res) {
    var code = req.params.code
    var boolQuery = new esb.boolQuery()
        .must(new esb.MatchPhraseQuery('code', code))
        .must(new esb.MatchPhraseQuery('type', ObjectType.DiscountCode))

    const requestBody = new esb.requestBodySearch().query(boolQuery)
    executeQuery(requestBody.toJSON()).then((response: any) => {
        return res.status(200).send(response?.body?.hits?.hits.map((h: any) => h._source)[0])
    }, (error: any) => {
        return res.status(400).send(error);
    })
}

function getAll(req, res) {
    var boolQuery = new esb.boolQuery()
        .must(new esb.MatchPhraseQuery('type', ObjectType.DiscountCode))

    const requestBody = new esb.requestBodySearch().query(boolQuery)
    executeQuery(requestBody.toJSON()).then((response: any) => {
        return res.status(200).send(response?.body?.hits?.hits.map((h: any) => h._source))
    }, (error: any) => {
        return res.status(400).send(error);
    })
}


function create(req, res) {
    //Recogemos el objeto
    if (req.body) {
        //Control de errores
        if (req.body.code != undefined) {
            _getDiscountCodeByCode(req.body.code).then((response: any) => {
                if (response?.body?.hits?.hits?.length > 0) {
                    res.status(400).send('Ya existe un descuento registrado con este código.');
                } else {
                    if (req.body.value != undefined) {
                        if (req.body.discountType != undefined) {

                            //Crear código de descuento
                            let discountCode: DiscountCode = {
                                code: req.body.code,
                                discountType: req.body.discountType,
                                value: req.body.value,
                                discountApplication: req.body.discountApplication,
                                repetitions: req.body.repetitions,
                                customers: req.body.customers,
                                products: req.body.products,
                                section: req.body.section,
                                subsection: req.body.subsection,
                                minPurchase: req.body.minPurchase,
                                color: req.body.color,
                                dateFrom: req.body.dateFrom,
                                dateTo: req.body.dateTo,
                                type: ObjectType.DiscountCode
                            }

                            //Guardar
                            saveDiscountCode(discountCode).then(() => {
                                return res.status(201).send(discountCode)
                            }, (error: any) => {
                                return res.status(400).send(error);
                            })
                        } else {
                            return res.status(400).send('Falta tipo de descuento descuento.');
                        }
                    } else {
                        return res.status(400).send('Valor de descuento no introducido.');
                    }
                }
            }, (error: any) => {
                return res.status(400).send(error);
            })
        } else {
            return res.status(400).send('Código de descuento no introducido.');
        }
    } else {
        return res.status(400).send('Descuento no introducido.');
    }
}

function update(req, res) {
    //Recoger los parámetros por post
    var discountCode: DiscountCode = req.body
    if (discountCode) {
        const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('code', discountCode.code))
        executeQuery(requestBody.toJSON()).then(result => {
            var actualDiscountCode = result.body.hits.hits[0];
            if (actualDiscountCode) {
                updateDiscountCode(actualDiscountCode._id, discountCode).then(() => {
                    return res.status(200).send({
                        response: true
                    });
                }, error => {
                    console.log(error)
                })
            } else {
                return res.status(200).send({
                    status: 'error',
                    message: 'No existe el código de descuento.'
                });
            }
        })
    } else {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar.'
        });
    }
}

function deleteByCode(req, res) {
    //Recoger los parámetros por post
    var code = req.params.code
    if (code) {
        _getDiscountCodeByCode(code).then((response: any) => {
            if (response?.body?.hits?.hits?.length > 0) {
                deleteDiscountCode(response.body.hits.hits[0]._id).then(() => {
                    return res.status(200).send(true);
                }, error => {
                    return res.status(500).send(error);
                })
            } else {
                res.status(204).send(true)
            }
        }, (error: any) => {
            return res.status(400).send(error);
        })
    }
}


module.exports = controller;





