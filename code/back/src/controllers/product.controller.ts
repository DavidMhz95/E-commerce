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
    productExample: Function
}

export var controller: ProductController = {
    add: (req, res) => add(req, res),
    getProductByRef: (req, res) => getProductByRef(req, res),
    update: (req, res) => update(req, res),
    deleteByRef: (req, res) => deleteByRef(req, res),
    getAll: (req, res) => getAll(req, res),
    productExample: (req,res) => productExample(req,res)
}

function getProductByRef(req, res) {
    //Recoger los parámetros por post
    var productRef = req.params.ref;
    if (productRef) {
        const requestBody = new esb.RequestBodySearch()
            .query(new esb.MatchPhraseQuery('ref', productRef));
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
        .query(new esb.MatchPhraseQuery('type', "1"));
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

        var Product: Product = {
            ref: params.ref,
            typeOfProduct: params.typeOfProduct,
            name: params.name,
            offerPrice: params.offerPrice,
            price: params.price,
            images: params.images,
            description: params.description,
            details: params.details,
            stockNumber: params.stockNumber,
            section: params.section,
            subsection: params.subsection,
            type: params.type
        }

        const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('ref', Product.ref))
        executeQuery(requestBody.toJSON()).then(result => {
            var actualProduct = result.body.hits.hits[0];
            if (actualProduct) {
                updateProduct(actualProduct._id, Product).then(() => {
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
    var product: Product = JSON.parse(params.product)
    if (product) {
        const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('ref', product.ref))
        executeQuery(requestBody.toJSON()).then(result => {
            if (result.body.hits.hits.length > 0) {
                res.status(200).send({
                    response: false
                });
            } else {
                saveProduct(product).then(() => {
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

function productExample(req,res){

    var dictionary = new Dictionary()
    var dictionary1 = new Dictionary()

    dictionary.set("talla","S")
    dictionary.set("talla","XS")
    dictionary.set("talla","M")

    dictionary1.set("color","rojo")
    dictionary1.set("color","azul")

    var typeOfProduct: TypeOfProduct={
        name: "Camiseta",
        properties: [dictionary,dictionary1]
    }
    
    var product: Product = 
    {
        ref: 12345,
        typeOfProduct: typeOfProduct,       
        name: "Camiseta HardRock",
        offerPrice: 50,
        price: 100,
        images: ["https://content.asos-media.com/-/media/homepages/ww/2020/09/14/ww_hourglass_moment_870x1110.jpg","https://content.asos-media.com/-/media/homepages/ww/2020/09/14/ww_flares_moment_870x1110-v2.jpg"],
        description: "Camiseta de puta madre",
        details:["Detalles de la camiseta","Algodon 60%","Cocaina 100%"],
        stockNumber: 50,
        section: "Camisetas",
        subsection: "Verano",
        type: 1
    }

    return res.status(201).send({
        product
    });
    
}
function deleteByRef(req, res) {
    //Recoger los parámetros por post
    var productRef = req.params.ref;
    if (productRef) {
        const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('ref', productRef))
        executeQuery(requestBody.toJSON()).then(result => {

            var Product = result.body.hits.hits[0];
            if (Product) {
                deleteProduct(Product._id).then(() => {
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
                    message: 'No se encuentra el producto'
                });
            }
        })
    }
}


module.exports = controller;





