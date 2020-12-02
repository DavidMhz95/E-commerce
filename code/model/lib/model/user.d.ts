import { Address } from './address';
import { ObjectType } from './enum';
import { PaymentInfo } from './payment-info';
export declare class User {
    type: ObjectType;
    name?: string | undefined;
    surname?: string | undefined;
    email?: string | undefined;
    hashPassword?: string | undefined;
    rol?: number | undefined;
    image?: string | undefined;
    address?: Address | undefined;
    payment?: PaymentInfo | undefined;
    constructor(type: ObjectType, name?: string | undefined, surname?: string | undefined, email?: string | undefined, hashPassword?: string | undefined, rol?: number | undefined, image?: string | undefined, address?: Address | undefined, payment?: PaymentInfo | undefined);
}
