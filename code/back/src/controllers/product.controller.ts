import { executeQuery, saveProduct, deleteProduct, updateProduct } from '../elastic';
import { Product } from '../models/product'
import { Dictionary, TypeOfProduct } from '../models/typeOfProduct';

const esb = require('elastic-builder'); // the builder

export interface ProductController {
    add: Function,
    getProductByRef: Function,
    getAll: Function,
    update: Function,
    deleteByRef: Function,
}

export var controller: ProductController = {
    add: (req, res) => add(req, res),
    getProductByRef: (req, res) => getProductByRef(req, res),
    update: (req, res) => update(req, res),
    deleteByRef: (req, res) => deleteByRef(req, res),
    getAll: (req, res) => getAll(req, res),
}

function getProductByRef(req, res) {
    //Recoger los parámetros por post
    var productRef = req.params.ref;
    if (productRef) {
        const requestBody = esb.requestBodySearch().query(
            esb.boolQuery()
                .must(esb.MatchPhraseQuery('ref', productRef))
                .must(esb.MatchPhraseQuery('type', 1))
        );
        // Build the request body
        var query = requestBody.toJSON()
        executeQuery(query).then(result => {
            return res.status(200).send(
                result.body.hits.hits.map(h => h._source)
            );
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
        .query(new esb.MatchPhraseQuery('type', "1"));
    // Build the request body
    var query = requestBody.toJSON()
    executeQuery(query).then(result => {
        return res.status(200).send(
            result.body.hits.hits.map(h => h._source)
        );
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

    if (params.ref &&
        params.typeOfProduct &&
        params.name &&
        params.offerPrice &&
        params.price &&
        params.images &&
        params.description &&
        params.details &&
        params.stockNumber &&
        params.section &&
        params.subsection &&
        params.type) {

        var p: Product = {
            reference: params.reference,
            type: params.type,
            name: params.name,
            offerPrice: params.offerPrice,
            price: params.price,
            images: params.images,
            description: params.description,
            details: params.details,
            stockNumber: params.stockNumber,
            section: params.section,
            subsection: params.subsection,
            properties: params.properties
        }

        const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('reference', p.reference))
        executeQuery(requestBody.toJSON()).then(result => {
            var actualProduct = result.body.hits.hits[0];
            if (actualProduct) {
                updateProduct(actualProduct._id, p).then(() => {
                    return res.status(200).send(
                        true
                    );
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
    var product: Product = req.body;
    if (product.reference &&
        product.name &&
        product.price &&
        product.description &&
        Number.isInteger(product.stockNumber) &&
        product.section &&
        product.subsection) {
        product.type = 1
        var boolQuery = new esb.boolQuery()
            .must(new esb.MatchPhraseQuery('reference', product.reference))
            .must(new esb.MatchPhraseQuery('type', 1))
        if (product) {
            const requestBody = new esb.requestBodySearch().query(boolQuery);
            executeQuery(requestBody.toJSON()).then(
                result => {
                    if (result.body.hits.hits.length > 0) {
                        res.status(200).send({
                            response: false
                        });
                    } else {
                        saveProduct(product).then(() => {
                            return res.status(201).send({
                                response: true,
                                product: product
                            });
                        },
                            error => console.log(error))
                    }
                }, error => {
                    console.log(error)
                }
            )

        }
    } else {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar'
        });
    }
}

function deleteByRef(req, res) {
    //Recoger los parámetros por post
    var productRef = req.params.ref;
    if (productRef) {
        const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('reference', productRef))
        executeQuery(requestBody.toJSON()).then(result => {

            var Product = result.body.hits.hits[0];
            if (Product) {
                deleteProduct(Product._id).then(() => {
                    return res.status(200).send(
                        true
                    );
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
                    message: 'No se encuentra el producto'
                });
            }
        })
    }
}


module.exports = controller;





