"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreConfiguration = void 0;
var StoreConfiguration = /** @class */ (function () {
    function StoreConfiguration(type, storeName, tabs, globalDiscount, shippingCosts) {
        this.type = type;
        this.storeName = storeName;
        this.tabs = tabs;
        this.globalDiscount = globalDiscount;
        this.shippingCosts = shippingCosts;
    }
    return StoreConfiguration;
}());
exports.StoreConfiguration = StoreConfiguration;
