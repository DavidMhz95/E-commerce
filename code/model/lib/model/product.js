"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = /** @class */ (function () {
    function Product(reference, properties, name, offerPrice, price, images, description, details, stock, section, subsection, type) {
        this.reference = reference;
        this.properties = properties;
        this.name = name;
        this.offerPrice = offerPrice;
        this.price = price;
        this.images = images;
        this.description = description;
        this.details = details;
        this.stock = stock;
        this.section = section;
        this.subsection = subsection;
        this.type = type;
    }
    return Product;
}());
exports.Product = Product;
