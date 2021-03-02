import { deleteDiscountCode, executeQuery, saveDiscountCode, updateDiscountCode } from '../elastic';
import { DiscountCode, ObjectType } from 'black-market-model';

const esb = require('elastic-builder'); // the builder

export interface DiscountCodeController {
    upsert: Function,
    getAll: Function,
    deleteByCode: Function,
    check: Function
}

export var controller: DiscountCodeController = {
    upsert: (req: any, res: any) => upsert(req, res),
    getAll: (req: any, res: any) => getAll(req, res),
    deleteByCode: (req: any, res: any) => deleteByCode(req, res),
    check: (req: any, res: any) => check(req, res)
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
    var price = req.params.price
    var user = req.params.user

    var boolSubQuery = new esb.boolQuery()
        .should([
            new esb.existsQuery('users').must(new esb.MatchPhraseQuery('users', user)),
            new esb.mustNot(new esb.existsQuery('users'))
        ]).minimumShouldMatch(1)

    var boolQuery = new esb.boolQuery()
        .must(new esb.MatchPhraseQuery('code', code))
        .must(new esb.MatchPhraseQuery('type', ObjectType.DiscountCode))
        .must(new esb.RangeQuery('minPurchase', price).gte())
        .must(boolSubQuery)

    const requestBody = new esb.requestBodySearch().query(boolQuery)
    executeQuery(requestBody.toJSON()).then((response: any) => {
        var discount : DiscountCode = response?.body?.hits?.hits.map((h: any) => h._source)[0]
        return res.status(200).send({
            discountType : discount.discountType,
            value: discount.value,
            discountApplication: discount.discountApplication,
            dateFrom: discount.dateFrom,
            dateTo: discount.dateTo
        })
    }, (error: any) => {
        return res.status(400).send(error);
    })
}

function getAll(req, res) {
    var boolQuery = new esb.boolQuery()
        .must(new esb.MatchPhraseQuery('type', ObjectType.DiscountCode))

    const requestBody = new esb.requestBodySearch().query(boolQuery).from(0).size(1000)
    executeQuery(requestBody.toJSON()).then((response: any) => {
        return res.status(200).send(response?.body?.hits?.hits.map((h: any) => h._source))
    }, (error: any) => {
        return res.status(400).send(error);
    })
}


function upsert(req, res) {
    //Recogemos el objeto
    if (req.body) {
        //Control de errores
        if (req.body.code != undefined) {
            _getDiscountCodeByCode(req.body.code).then((response: any) => {
                let discountCode: DiscountCode = req.body
                if (response?.body?.hits?.hits?.length > 0) {
                    updateDiscountCode(response.body.hits.hits[0]._id, discountCode).then(() => {
                        return res.status(200).send({
                            response: true
                        });
                    }, error => {
                        console.log(error)
                    })
                } else {
                    discountCode.type = ObjectType.DiscountCode
                    //Guardar
                    saveDiscountCode(discountCode).then(() => {
                        return res.status(201).send(discountCode)
                    }, (error: any) => {
                        return res.status(400).send(error);
                    })
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





