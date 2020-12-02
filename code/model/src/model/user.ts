import { Address } from './address';
import { ObjectType } from './enum';
import { PaymentInfo } from './payment-info';

export class User {

    constructor(
        public type: ObjectType,
        public name?: string,
        public surname?: string,
        public email?: string,
        public hashPassword?: string,
        public rol?: number,
        public image?: string,
        public address?: Address,
        public payment?: PaymentInfo
        // Estas están fuera del modelo de datos, hay que hablar de si se meten o no ;)
        // public isSubscribed: boolean
    ) { }

}