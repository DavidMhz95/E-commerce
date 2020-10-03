import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import path from 'path'
import favicon from 'serve-favicon'
import fs from 'fs';

require('./utils')
var cors = require('cors')
var compression = require('compression')

let rawdata = fs.readFileSync('servicesettings.json')
let serviceSettings = JSON.parse(rawdata.toString())

// var ssl = {
//     key: fs.readFileSync(path.join(__dirname, 'cert.key')),
//     cert: fs.readFileSync(path.join(__dirname, 'certificate.crt')) 
// };

const port = serviceSettings.node.port
const app = express()


// const https = require('https');

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())
app.use(favicon(path.join(__dirname, 'favicon.ico')))

//Añadir prefijos a rutas / Cargar rutas
app.use('/', require(path.join(__dirname, './rutas.js')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.send(err)
})

app.listen(port, () => {
    return console.log(`server is listening on ${port}`)
})

//https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/
//https://stackoverflow.com/questions/11804202/how-do-i-setup-a-ssl-certificate-for-an-express-js-server
//https://stackoverflow.com/questions/33133987/cannot-open-ssl-key-file-in-node-server-enoent
//https.createServer(ssl, app).listen(port);