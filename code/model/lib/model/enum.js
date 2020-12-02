"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderState = exports.ObjectType = void 0;
var ObjectType;
(function (ObjectType) {
    ObjectType[ObjectType["User"] = 0] = "User";
    ObjectType[ObjectType["Product"] = 1] = "Product";
    ObjectType[ObjectType["Order"] = 2] = "Order";
    ObjectType[ObjectType["DiscountCode"] = 3] = "DiscountCode";
    ObjectType[ObjectType["Configuration"] = 4] = "Configuration";
})(ObjectType = exports.ObjectType || (exports.ObjectType = {}));
var orderState;
(function (orderState) {
    orderState[orderState["Realizado"] = 0] = "Realizado";
    orderState[orderState["Preparado"] = 1] = "Preparado";
    orderState[orderState["Enviado"] = 2] = "Enviado";
    orderState[orderState["Entregado"] = 3] = "Entregado";
    orderState[orderState["Solicita_Devolucion"] = 4] = "Solicita_Devolucion";
    orderState[orderState["Devuelto"] = 5] = "Devuelto";
})(orderState = exports.orderState || (exports.orderState = {}));
