import fs from 'fs';
import { Client, ClientOptions } from '@elastic/elasticsearch'

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

export async function executeQuery(query:any) {
    return await client.search({
        index: serviceSettings.elasticsearch.dbName,
        body: query
    }, {
        ignore: [404],
        maxRetries: 3
    })
}
