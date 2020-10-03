import { executeQuery, saveUser, deleteUser, updateUser } from '../elastic';
import { User } from '../models/user'

const esb = require('elastic-builder'); // the builder

export interface UserController {
    create: Function,
    getByEmail: Function,
    getAll: Function,
    update: Function,
    deleteByEmail: Function,
    logIn: Function,
}

export var controller: UserController = {
    create: (req: any, res: any) => create(req, res),
    getByEmail: (req: any, res: any) => getByEmail(req, res),
    update: (req: any, res: any) => update(req, res),
    deleteByEmail: (req: any, res: any) => deleteByEmail(req, res),
    getAll: (req: any, res: any) => getAll(req, res),
    logIn: (req: any, res: any) => logIn(req, res)
}


function _getUserByEmail(email: string, pass: string = undefined): Promise<any> {
    if (email) {
        var boolQuery = new esb.boolQuery()
            .must(new esb.MatchPhraseQuery('email', email))
            .must(new esb.MatchPhraseQuery('type', 0))
        if (pass) {
            boolQuery = boolQuery.must(new esb.MatchPhraseQuery('hash_password', pass))
        }
        const requestBody = new esb.requestBodySearch().query(boolQuery);
        // Build the request body      
        return executeQuery(requestBody.toJSON())
    }
}

function logIn(req: any, res: any) {
    _getUserByEmail(req.body.email, req.body.pass).then(((response: any) => {
        var user: User
        if (response?.body?.hits?.hits?.length > 0) {
            user = response.body.hits.hits[0]._source
        }
        return res.status(200).send(user);
    }), (error: any) => {
        return res.status(400).send(error);
    })
}


function getByEmail(req, res) {
    _getUserByEmail(req.params.email).then(((response: any) => {
        var user: User
        if (response?.body?.hits?.hits?.length > 0) {
            user = response.body.hits.hits[0]._source
        }
        return res.status(200).send(user);
    }), (error: any) => {
        return res.status(400).send(error);
    })
}

function create(req, res) {
    //Recoger los parámetros por post

    if (req.body.name &&
        //params.surname &&
        req.body.email &&
        req.body.hash_password &&
        req.body.type != undefined &&
        req.body.rol != undefined) {

        var user: User = {
            name: req.body.name,
            surname: req.body.surname,
            rol: req.body.rol,
            email: req.body.email,
            hash_password: req.body.hash_password,
            type: req.body.type
        }

        _getUserByEmail(user.email).then((response: any) => {
            if (response?.body?.hits?.hits?.length > 0) {
                res.status(400).send('Ya existe un usuario registrado con este email.');
            } else {
                saveUser(user).then(() => {
                    return res.status(201).send(user)
                }, (error: any) => {
                    return res.status(400).send(error);
                })
            }
        }, (error: any) => {
            return res.status(400).send(error);
        })
    } else {
        return res.status(400).send('Faltan datos por enviar');
    }
}



function getAll(req, res) {
    const requestBody = new esb.RequestBodySearch()
        .query(new esb.MatchPhraseQuery('type', "0"));
    // Build the request body
    var query = requestBody.toJSON()
    executeQuery(query).then(result => {
        return res.status(200).send(result.body.hits.hits.map((user: any) => user._source));
    }, error => {
        return res.status(400).send(error);
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



function deleteByEmail(req, res) {
    //Recoger los parámetros por post
    var userEmail = req.params.email;
    if (userEmail) {
        _getUserByEmail(userEmail).then((response: any) => {
            if (response?.body?.hits?.hits?.length > 0) {
                deleteUser(response.body.hits.hits[0]._id).then(() => {
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





