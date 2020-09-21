import fs from 'fs';
import { Client, ClientOptions } from '@elastic/elasticsearch'
import { User } from './models/user';


let rawdata = fs.readFileSync('servicesettings.json')
let serviceSettings = JSON.parse(rawdata.toString())

const settings = {
    node: serviceSettings.elasticsearch.dbServer,
    auth: {
        username: serviceSettings.elasticsearch.dbUser,
        password: serviceSettings.elasticsearch.dbPassword
    }
}
const client = new Client(settings)

export async function executeQuery(query: any) {
    return await client.search({
        index: serviceSettings.elasticsearch.dbName,
        body: query
    }, {
        ignore: [404],
        maxRetries: 3
    })
}

export async function getIdByEmail(query: any) {
    return await client.search({
        index: serviceSettings.elasticsearch.dbName,
        body: query
    }, {
        ignore: [404],
        maxRetries: 3
    })
}

export async function saveUser(user: User) {
    return await client.index({
            index: serviceSettings.elasticsearch.dbName,
            body: user
        }
    )
}

export async function updateUser(id, user: User) {
    return await client.update({
        id: id,
        index: serviceSettings.elasticsearch.dbName,
        body:  {doc:user}
       })
}

export async function deleteUser(id) {
    return await client.delete({
        id: id,
        index: serviceSettings.elasticsearch.dbName
    })
}

