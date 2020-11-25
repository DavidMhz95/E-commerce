import { State } from './state';
import { PaymentInfo } from './payment-info';
import { User } from './user';
import { CartProduct } from './cart-product';
import { ShipmentType } from './shipment-type';

export class Order {

    constructor(
        public id?: number,
        public user?: User,
        public products?: CartProduct[],
        public dateOrder?: Date,
        public dateShipment?: Date,
        public information?: number,
        public state?: State,
        public paymentInfo?: PaymentInfo,
        public typeShipment?: ShipmentType
    ) { }

}