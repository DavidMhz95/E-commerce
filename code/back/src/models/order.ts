import { orderState } from './enum';
import { PaymentInfo } from './paymentInfo';
import { User } from './user';
import { Product } from './product';
import { ObjectType } from './enum';

export class Order {

    constructor(
        public orderId: number,
        public user: User,
        public products: Product[],
        public dateOrder: Date,
        public dateShipment: Date,
        public information: String[],
        public state: orderState = 0,
        //public paymentInfo: PaymentInfo, TODO: Chequear si esto debemos guardarlo o de que manera 
        public type: ObjectType = 2
    ) {}

  }