import fs from 'fs';
import { Client } from '@elastic/elasticsearch'
import { User } from './models/user';
import { Product } from './models/product';
import { Order } from './models/Order';
import { ObjectType } from './models/enum';


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
    if(!user.type){
        user.type = ObjectType.User
    }
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
        body: { doc: user }
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
    if(!product.type){
        product.type = ObjectType.Order
    }
    return await client.index({
        index: serviceSettings.elasticsearch.dbName,
        body: product
    })
}

export async function updateProduct(id:string, product: Product) {
    if(!product.type){
        product.type = ObjectType.Order
    }
    return await client.update({
        id: id,
        index: serviceSettings.elasticsearch.dbName,
        body: { doc: product }
    })
}

export async function deleteProduct(id:string) {
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
    if (!order.id) {
        order.id = new Date().getTime()
    }
    if(!order.type){
        order.type = ObjectType.Order
    }
    return await client.index({
        index: serviceSettings.elasticsearch.dbName,
        body: order
    })
}

export async function updateOrder(id: string, order: Order) {
    if(!order.type){
        order.type = ObjectType.Order
    }
    return await client.update({
        id: id,
        index: serviceSettings.elasticsearch.dbName,
        body: { doc: order }
    })
}

export async function deleteOrder(id:string) {
    return await client.delete({
        id: id,
        index: serviceSettings.elasticsearch.dbName
    })
} 