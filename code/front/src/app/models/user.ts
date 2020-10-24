import { UserAdress } from './userAdress';

export class User {

    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public hash_password: string,
        public type: number,
        public rol: number,
        public image: string

        //Estas están fuera del modelo de datos, hay que hablar de si se meten o no ;)
        //public rol: string,
        //public totalSpent: number,
        //public isSubscribed: boolean
    ) { }

}