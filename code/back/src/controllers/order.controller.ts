import { executeQuery, saveOrder, deleteOrder, updateOrder } from '../elastic'
import { Order } from '../models/Order'
import { ObjectType } from '../models/enum'

const esb = require('elastic-builder') // the builder

export interface OrderController {
    getAll: Function,
    getById: Function,
    getByUser: Function,
    add: Function,
    update: Function,
    deleteById: Function,
}

export var controller: OrderController = {
    getAll: (req, res) => getAll(req, res),
    getById: (req, res) => getById(req, res),
    getByUser: (req, res) => getByUser(req, res),
    add: (req, res) => add(req, res),
    update: (req, res) => update(req, res),
    deleteById: (req, res) => deleteById(req, res),
}

function getAll(req, res) {
    const requestBody = new esb.RequestBodySearch()
        .query(new esb.MatchPhraseQuery('type', ObjectType.Order))
    // Build the request body
    var query = requestBody.toJSON()
    executeQuery(query).then(result => {
        return res.status(200).send({
            results: result.body.hits.hits.map((hit: any) => hit._source)
        })
    }, error => {
        return res.status(400).send({
            status: 'error',
            message: error.message
        })
    })
}

function getById(req, res) {
    //Recoger los parámetros por post
    var orderId = req.params.ref
    if (orderId) {
        const requestBody = new esb.requestBodySearch().query(
            new esb.boolQuery()
                .must(new esb.MatchPhraseQuery('orderId', orderId))
                .must(new esb.MatchPhraseQuery('type', ObjectType.Order))
        )

        // Build the request body
        var query = requestBody.toJSON()
        executeQuery(query).then(result => {
            return res.status(200).send({
                results: result.body.hits.hits.map((hit: any) => hit._source)
            })
        })
    } else {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar'
        })
    }
}

function getByUser(req, res) {
    //Recoger los parámetros por post
    var userEmail = req.params.email
    if (userEmail) {
        const requestBody = new esb.requestBodySearch().query(
            new esb.boolQuery()
                .must(new esb.MatchPhraseQuery('user.email', userEmail))
                .must(new esb.MatchPhraseQuery('type', ObjectType.Order))
        )
        // Build the request body
        var query = requestBody.toJSON()
        executeQuery(query).then(result => {
            return res.status(200).send(result.body.hits.hits.map((hit: any) => hit._source))
        }, error => {
            return res.status(500).send({
                status: 'error',
                message: error
            })
        })
    } else {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar'
        })
    }
}

function add(req, res) {
    //Recoger los parámetros por post
    let order: Order = req.body
    if (order) {
        saveOrder(order).then(() => {
            return res.status(201).send({
                response: true
            })
        }, error => console.log(error))
    } else {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar'
        })
    }
}

function update(req, res) {
    //Recoger los parámetros por post
    var order: Order = req.body
    if (order.id) {
        const requestBody = new esb.requestBodySearch().query(new esb.boolQuery()
            .must(new esb.MatchPhraseQuery('orderId', order.id))
            .must(new esb.MatchPhraseQuery('type', ObjectType.Order)))

        executeQuery(requestBody.toJSON()).then(result => {
            var actualOrder = result.body.hits.hits[0]
            if (actualOrder) {
                updateOrder(actualOrder._id, order).then(() => {
                    return res.status(200).send({
                        response: true
                    })
                }, error => {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar el pedido'
                    })
                })
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el id'
                })
            }
        })
    } else {
        return res.status(404).send({
            status: 'error',
            message: 'No existe el id'
        })
    }
}

function deleteById(req, res) {

    var orderId = req.params.ref
    if (orderId) {
        const requestBody = new esb.requestBodySearch().query(
            new esb.boolQuery()
                .must(new esb.MatchPhraseQuery('orderId', orderId))
                .must(new esb.MatchPhraseQuery('type', ObjectType.Order))
        )

        // Build the request body
        executeQuery(requestBody.toJSON()).then(result => {
            var deletedOrder = result.body.hits.hits[0]
            if (deletedOrder) {
                deleteOrder(deletedOrder._id).then(() => {
                    return res.status(200).send({
                        response: true
                    })
                }, (error: any) => {
                    return res.status(500).send({
                        status: 'error',
                        message: error.message
                    })
                })
            } else {
                return res.status(204).send({
                    status: 'error',
                    message: 'No existe el id'
                })
            }
        })



    } else {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar'
        })
    }
}

module.exports = controller





