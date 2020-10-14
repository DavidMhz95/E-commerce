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


const URI = "./../../images"
function upload(req, res) {
    try {
        const id = new Date().getTime().toString()
        const local_path = path.join(__dirname, URI)
        const fileName = path.join(local_path, id)
        if (!fs.existsSync(local_path)) {
            fs.mkdirSync(local_path)
        }
        fs.writeFile(fileName, JSON.parse(req.body.file).toString().split(';base64,').pop(), 'base64', function (err) {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.status(200).send({ id });
            }
        })
    } catch (err) {
        return res.status(400).send(err);
    }
}

function download(req, res) {
    const fileName = path.join(__dirname, URI, req.params.id)
    try {
        res.sendFile(fileName);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports = controller;





