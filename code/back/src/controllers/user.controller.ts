import { executeQuery, saveUser, deleteUser, updateUser } from '../elastic';
import { User } from '../models/user'

const esb = require('elastic-builder'); // the builder

export interface UserController {
    add: Function,
    getUserByEmail: Function,
    getAll: Function,
    update: Function,
    deleteByEmail: Function
}

export var controller: UserController = {
    add: (req, res) => add(req, res),
    getUserByEmail: (req, res) => getUserByEmail(req, res),
    update: (req, res) => update(req, res),
    deleteByEmail: (req, res) => deleteByEmail(req, res),
    getAll: (req, res) => getAll(req, res),
}

function getUserByEmail(req, res) {
    //Recoger los parámetros por post
    var userEmail = req.params.email;
    if (userEmail) {
        const requestBody = new esb.RequestBodySearch()
            .query(new esb.MatchPhraseQuery('email', userEmail));
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
        .query(new esb.MatchPhraseQuery('type', "0"));
    // Build the request body
    var query = requestBody.toJSON()
    executeQuery(query).then(result => {
        return res.status(200).send({
            results: result.body.hits.hits
        });
    },error => {
        return res.status(400).send({
            status: 'error',
            message: error.message
        });
    })

    

}

function update(req, res) {
    //Recoger los parámetros por post
    var params = req.body;

    if (params.name &&
        params.surname &&
        params.email &&
        params.hash_password &&
        params.type &&
        params.rol) {

        var user: User = {
            name: params.name,
            surname: params.surname,
            rol: params.rol,
            email: params.email,
            hash_password: params.hash_password,
            type: params.type
        }

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

function add(req, res) {
    //Recoger los parámetros por post
    var params = req.body;

    if (params.name &&
        params.surname &&
        params.email &&
        params.hash_password &&
        params.type &&
        params.address) {

        var user: User = {
            name: params.name,
            surname: params.surname,
            rol: params.address,
            email: params.rol,
            hash_password: params.hash_password,
            type: params.type
        }

        const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('email', user.email))
        executeQuery(requestBody.toJSON()).then(result => {
            if (result.body.hits.hits.length > 0) {
                res.status(200).send({
                    response: false
                });
            } else {
                saveUser(user).then(() => {
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

function deleteByEmail(req, res) {
    //Recoger los parámetros por post
    var userEmail = req.params.email;
    if (userEmail) {
        const requestBody = new esb.RequestBodySearch().query(new esb.MatchPhraseQuery('email', userEmail))
        executeQuery(requestBody.toJSON()).then(result => {

            var user = result.body.hits.hits[0];
            if (user) {
                deleteUser(user._id).then(() => {
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
                    message: 'No se encuentra el usuario'
                });
            }
        })
    }
}


module.exports = controller;





