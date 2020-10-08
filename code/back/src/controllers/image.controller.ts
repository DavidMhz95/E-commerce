import { executeQuery, saveOrder, deleteOrder, updateOrder } from '../elastic';
import path from 'path'

var fs = require('fs');

export interface ImageController {
    upload: Function,
    get: Function
}

export var controller: ImageController = {
    upload: (req, res) => upload(req, res),
    get: (req, res) => download(req, res)
}

function upload(req, res) {

    try {
        var id = new Date().getTime().toString()
        var fileName = path.join(__dirname, "./../", id)
        fs.writeFile(fileName, JSON.parse(req.body.file).toString().split(';base64,').pop(), 'base64', function (err) {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.status(200).send({ id });
            }

        })
    }
    catch (err) {
        return res.status(400).send(err);
    }
}

function download(req, res) {
    var fileName = path.join(__dirname, "./../", req.params.id)
    try {
        res.sendFile(fileName);
    }
    catch (err) {
        return res.status(400).send(err);
    }
}

module.exports = controller;





