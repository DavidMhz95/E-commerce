import { ObjectType } from './enum';
import { UserAdress } from './userAdress';

var mongoose = require('mongoose');
var mexp = require('mongoose-elasticsearch-xp').v2;


var UserSchema = new mongoose.Schema({
     name: String,
     surname: String,
     email: String,
     hash_password: String,
     type: String
});
 
UserSchema.plugin(mexp);
 
export var User = mongoose.model('User', UserSchema);
//module.exports = mongoose.model('User', UserSchema);

// export class User {

//     constructor(
//         public id : string,
//         public name: string,
//         public surname: string,
//         public email: string,
//         public hash_password: string,
//         public type: ObjectType = 0
//         //public adress: UserAdress

//         //Estas están fuera del modelo de datos, hay que hablar de si se meten o no ;)
//         //public image: string,
//         //public rol: string,
//         //public totalSpent: number,
//         //public isSubscribed: boolean
//     ) {}
//   }