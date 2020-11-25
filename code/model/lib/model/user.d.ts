import { Address } from './address';
import { PaymentInfo } from './payment-info';
export declare class User {
    name?: string | undefined;
    surname?: string | undefined;
    email?: string | undefined;
    hash_password?: string | undefined;
    rol?: number | undefined;
    image?: string | undefined;
    address?: Address | undefined;
    payment?: PaymentInfo | undefined;
    constructor(name?: string | undefined, surname?: string | undefined, email?: string | undefined, hash_password?: string | undefined, rol?: number | undefined, image?: string | undefined, address?: Address | undefined, payment?: PaymentInfo | undefined);
}
