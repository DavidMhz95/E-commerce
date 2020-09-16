import { State } from './state';
import { PaymentInfo } from './paymentInfo';
import { User } from './user';
import { Product } from './product';
import { ObjectType } from './enum';

export class Order {

    constructor(
        public id: number,
        //public user: User,
        public product: Product,
        public dateOrder: Date,
        public dateShipment: Date,
        public information: number,
        public state: State,
        public paymentInfo: PaymentInfo,
        public type: ObjectType = 2
    ) {}

  }