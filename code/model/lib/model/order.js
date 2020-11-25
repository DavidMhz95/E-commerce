"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var Order = /** @class */ (function () {
    function Order(id, user, products, dateOrder, dateShipment, information, state, paymentInfo, typeShipment) {
        this.id = id;
        this.user = user;
        this.products = products;
        this.dateOrder = dateOrder;
        this.dateShipment = dateShipment;
        this.information = information;
        this.state = state;
        this.paymentInfo = paymentInfo;
        this.typeShipment = typeShipment;
    }
    return Order;
}());
exports.Order = Order;
