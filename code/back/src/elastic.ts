import fs from 'fs';
import { Client, ClientOptions } from '@elastic/elasticsearch'
import { User } from './models/user';
import { Product } from './models/product';
import { Order } from './models/Order';


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

//  USUARIOS 
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

// PRODUCTOS 

export async function getIdByRef(query: any) {
    return await client.search({
        index: serviceSettings.elasticsearch.dbName,
        body: query
    }, {
        ignore: [404],
        maxRetries: 3
    })
}

export async function saveProduct(product: Product) {
    return await client.index({
            index: serviceSettings.elasticsearch.dbName,
            body: product
        }
    )
}

export async function updateProduct(id,product: Product) {
    return await client.update({
        id: id,
        index: serviceSettings.elasticsearch.dbName,
        body:  {doc:product}
       })
}

export async function deleteProduct(id) {
    return await client.delete({
        id: id,
        index: serviceSettings.elasticsearch.dbName
    })
} 

//PEDIDOS 

export async function getByOrderId(query: any) {
    return await client.search({
        index: serviceSettings.elasticsearch.dbName,
        body: query
    }, {
        ignore: [404],
        maxRetries: 3
    })
}

export async function saveOrder(order: Order) {
    return await client.index({
            index: serviceSettings.elasticsearch.dbName,
            body: order
        }
    )
}

export async function updateOrder(id,order: Order) {
    return await client.update({
        id: id,
        index: serviceSettings.elasticsearch.dbName,
        body:  {doc:order}
       })
}

export async function deleteOrder(id) {
    return await client.delete({
        id: id,
        index: serviceSettings.elasticsearch.dbName
    })
} 