import { UserAdress } from './userAdress';

export class User {

    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public hash_password: string,
        public type: number,
        public rol: number

        //Estas están fuera del modelo de datos, hay que hablar de si se meten o no ;)
        //public image: string,
        //public rol: string,
        //public totalSpent: number,
        //public isSubscribed: boolean
    ) {}

  }