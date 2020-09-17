import { executeQuery, saveUser } from '../elastic';
import { User } from '../models/user'

const esb = require('elastic-builder'); // the builder

export interface UserController {
    add: Function,
    getById: Function,
    // getAll: Function,
    // update: Function,
    // delete: Function,
}

export var controller: UserController = {
    add: (req, res) => add(req, res),
    getById: (req, res) => getById(req, res),
}

function getById(req, res) {
    //Recoger los parámetros por post
    var userId = req.params.id;
    if (userId) {
        const requestBody = new esb.RequestBodySearch()
            .query(new esb.MatchPhraseQuery('name', userId));
        // Build the request body
        var query = requestBody.toJSON()
        executeQuery(query).then(result => {
            return res.status(200).send({
                results: result.body.hits.hits
            });
        })
    } else {
        return res.status(200).send({
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
        params.type) {

        var user: User = {
            name: params.name,
            surname: params.surname,
            address: undefined,
            email: params.email,
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
                    return res.status(200).send({
                        response: true
                    });
                },
                error => console.log(error))
            }
        })

    } else {
        return res.status(200).send({
            status: 'error',
            message: 'Faltan datos por enviar'
        });
    }
}


module.exports = controller;





