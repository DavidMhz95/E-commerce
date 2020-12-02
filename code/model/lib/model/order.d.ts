import { State } from './state';
import { PaymentInfo } from './payment-info';
import { User } from './user';
import { CartProduct } from './cart-product';
import { ShipmentType } from './shipment-type';
import { ObjectType } from './enum';
export declare class Order {
    type: ObjectType;
    id?: number | undefined;
    user?: User | undefined;
    products?: CartProduct[] | undefined;
    dateOrder?: Date | undefined;
    dateShipment?: Date | undefined;
    information?: number | undefined;
    state?: State | undefined;
    paymentInfo?: PaymentInfo | undefined;
    typeShipment?: ShipmentType | undefined;
    constructor(type: ObjectType, id?: number | undefined, user?: User | undefined, products?: CartProduct[] | undefined, dateOrder?: Date | undefined, dateShipment?: Date | undefined, information?: number | undefined, state?: State | undefined, paymentInfo?: PaymentInfo | undefined, typeShipment?: ShipmentType | undefined);
}
