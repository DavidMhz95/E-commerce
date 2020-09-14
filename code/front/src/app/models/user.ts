import { UserAdress } from './userAdress';

export class User {

    constructor(
        public id : number,
        public name: string,
        public surname: string,
        public email: string,
        public hash_password: string,
        public adress: UserAdress
        //Estas están fuera del modelo de datos, hay que hablar de si se meten o no ;)
        //public image: string,
        //public rol: string,
        //public totalSpent: number,
        //public isSubscribed: boolean
    ) {}

  }