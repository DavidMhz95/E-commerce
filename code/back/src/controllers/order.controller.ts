import { executeQuery, saveOrder, deleteOrder, updateOrder } from '../elastic';
import { Order } from '../models/Order'


const esb = require('elastic-builder'); // the builder

export interface OrderController {
    add: Function,
    getOrderById: Function,
    getAll: Function,
    update: Function,
    deleteByRef: Function,
    OrderExample: Function
}

export var controller: OrderController = {
    add: (req, res) => add(req, res),
    getOrderById: (req, res) => getOrderById(req, res),
    update: (req, res) => update(req, res),
    deleteByRef: (req, res) => deleteByRef(req, res),
    getAll: (req, res) => getAll(req, res),
    OrderExample: (req, res) => OrderExample(req, res)
}

function getOrderById(req, res) {
    //Recoger los parámetros por post
    var orderId = req.params.orderId;
    if (orderId) {
        const requestBody = esb.requestBodySearch().query(
            esb.boolQuery()
                .must(esb.MatchPhraseQuery('orderId', orderId))
                .must(esb.MatchPhraseQuery('type', 2))
        );

        // Build the request body
        var query = requestBody.toJSON()
        executeQuery(query).then(result => {
            return res.status(200).send({
                results: result.body.hits.hits
            });
        })
    } else {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar'
        });
    }

}


function getAll(req, res) {
    const requestBody = new esb.RequestBodySearch()
        .query(new esb.MatchPhraseQuery('type', "2"));
    // Build the request body
    var query = requestBody.toJSON()
    executeQuery(query).then(result => {
        return res.status(200).send({
            results: result.body.hits.hits
        });
    }, error => {
        return res.status(400).send({
            status: 'error',
            message: error.message
        });
    })

}

function update(req, res) {
    //Recoger los parámetros por post
    var params = req.body;

    if (params.orderId &&
        params.user &&
        params.products &&
        params.dateOrder &&
        params.dateShipment &&
        params.information &&
        params.state &&
        params.type 
        ) {

        var Order: Order = {
            orderId: params.orderId,
            user: params.user,
            products: params.products,
            dateOrder: params.dateOrder,
            dateShipment: params.dateShipment,
            information: params.information,
            state: params.state,
            type: params.type
        }

        const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('orderId', Order.orderId))
        executeQuery(requestBody.toJSON()).then(result => {
            var actualOrder = result.body.hits.hits[0];
            if (actualOrder) {
                updateOrder(actualOrder._id, Order).then(() => {
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

function add(req, res) {
    //Recoger los parámetros por post
    var params = req.body;
    var Order: Order = JSON.parse(params.Order)
    if (Order) {
        const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('orderId', Order.orderId))
        executeQuery(requestBody.toJSON()).then(result => {
            if (result.body.hits.hits.length > 0) {
                res.status(200).send({
                    response: false
                });
            } else {
                saveOrder(Order).then(() => {
                    return res.status(201).send({
                        response: true
                    });
                },
                    error => console.log(error))
            }
        })
    } else {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar'
        });
    }
}

function OrderExample(req, res) {

    // var dictionary = new Dictionary()
    // var dictionary1 = new Dictionary()

    // dictionary.set("talla", "S")
    // dictionary.set("talla", "XS")
    // dictionary.set("talla", "M")

    // dictionary1.set("color", "rojo")
    // dictionary1.set("color", "azul")

    // var typeOfOrder: TypeOfOrder = {
    //     name: "Camiseta",
    //     properties: [dictionary, dictionary1]
    // }

    // var Order: Order =
    // {
    //     ref: 12345,
    //     typeOfOrder: typeOfOrder,
    //     name: "Camiseta HardRock",
    //     offerPrice: 50,
    //     price: 100,
    //     images: ["https://content.asos-media.com/-/media/homepages/ww/2020/09/14/ww_hourglass_moment_870x1110.jpg", "https://content.asos-media.com/-/media/homepages/ww/2020/09/14/ww_flares_moment_870x1110-v2.jpg"],
    //     description: "Camiseta de puta madre",
    //     details: ["Detalles de la camiseta", "Algodon 60%", "Cocaina 100%"],
    //     stockNumber: 50,
    //     section: "Camisetas",
    //     subsection: "Verano",
    //     type: 1
    // }

    // return res.status(201).send({
    //     Order
    // });

}

function deleteByRef(req, res) {
    //Recoger los parámetros por post
    var orderId = req.params.orderId;
    if (orderId) {
        const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('orderId', orderId))
        executeQuery(requestBody.toJSON()).then(result => {
            var Order = result.body.hits.hits[0];
            if (Order) {
                deleteOrder(Order._id).then(() => {
                    return res.status(200).send({
                        response: true
                    });
                },
                    error => {
                        return res.status(500).send({
                            status: 'error',
                            message: error.message
                        });
                    })
            } else {
                return res.status(204).send({
                    status: 'error',
                    message: 'No se encuentra el Order'
                });
            }
        })
    }
}


module.exports = controller;





