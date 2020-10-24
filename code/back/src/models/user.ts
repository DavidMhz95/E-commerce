import { Address } from './address';
import { PaymentInfo } from './payment-info';
import { IObjectyType, ObjectType } from './enum';

export class User implements IObjectyType {

    type: ObjectType = ObjectType.User

    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public hash_password: string,
        public rol: number,
        public image: string,
        public address: Address,
        public payment: PaymentInfo
        //Estas están fuera del modelo de datos, hay que hablar de si se meten o no ;)
        //public isSubscribed: boolean
    ) { }

}