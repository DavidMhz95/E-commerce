"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
var Address = /** @class */ (function () {
    function Address(name, surname, street, streetAlt, zip, city, country, telephone) {
        this.name = name;
        this.surname = surname;
        this.street = street;
        this.streetAlt = streetAlt;
        this.zip = zip;
        this.city = city;
        this.country = country;
        this.telephone = telephone;
    }
    return Address;
}());
exports.Address = Address;
