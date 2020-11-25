"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentInfo = exports.PymetnTypes = void 0;
var PymetnTypes;
(function (PymetnTypes) {
    PymetnTypes[PymetnTypes["VISA"] = 0] = "VISA";
    PymetnTypes[PymetnTypes["MASTERCARD"] = 1] = "MASTERCARD";
    PymetnTypes[PymetnTypes["PAYPAL"] = 2] = "PAYPAL";
})(PymetnTypes = exports.PymetnTypes || (exports.PymetnTypes = {}));
var PaymentInfo = /** @class */ (function () {
    function PaymentInfo(type, owner, number, date, csv) {
        this.type = type;
        this.owner = owner;
        this.number = number;
        this.date = date;
        this.csv = csv;
    }
    return PaymentInfo;
}());
exports.PaymentInfo = PaymentInfo;
