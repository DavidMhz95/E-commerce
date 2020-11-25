"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountApplication = exports.DiscountType = exports.DiscountCode = void 0;
var DiscountCode = /** @class */ (function () {
    function DiscountCode(code, discountType, //Porcentaje, valor absoluto,
    value, discountApplication, //Envío, Productos, Categoria, Subcategoria, Todo
    repetitions, user, products, section, subsection, minPurchase, color, dateFrom, dateTo) {
        this.code = code;
        this.discountType = discountType;
        this.value = value;
        this.discountApplication = discountApplication;
        this.repetitions = repetitions;
        this.user = user;
        this.products = products;
        this.section = section;
        this.subsection = subsection;
        this.minPurchase = minPurchase;
        this.color = color;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
    return DiscountCode;
}());
exports.DiscountCode = DiscountCode;
var DiscountType;
(function (DiscountType) {
    DiscountType["Percentage"] = "Porcentaje";
    DiscountType["AbsoluteValue"] = "Valor";
})(DiscountType = exports.DiscountType || (exports.DiscountType = {}));
var DiscountApplication;
(function (DiscountApplication) {
    DiscountApplication["Todo"] = "Todo";
    //Product = "Producto",
    //Section  = "Sección",
    //Subsection = "Subsección", 
    DiscountApplication["Envio"] = "Envio";
})(DiscountApplication = exports.DiscountApplication || (exports.DiscountApplication = {}));
