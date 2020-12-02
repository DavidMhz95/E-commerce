"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(type, name, surname, email, hashPassword, rol, image, address, payment
    // Estas están fuera del modelo de datos, hay que hablar de si se meten o no ;)
    // public isSubscribed: boolean
    ) {
        this.type = type;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.hashPassword = hashPassword;
        this.rol = rol;
        this.image = image;
        this.address = address;
        this.payment = payment;
    }
    return User;
}());
exports.User = User;
