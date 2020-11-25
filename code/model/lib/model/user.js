"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(name, surname, email, hash_password, rol, image, address, payment
    //Estas están fuera del modelo de datos, hay que hablar de si se meten o no ;)
    //public isSubscribed: boolean
    ) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.hash_password = hash_password;
        this.rol = rol;
        this.image = image;
        this.address = address;
        this.payment = payment;
    }
    return User;
}());
exports.User = User;
