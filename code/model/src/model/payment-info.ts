export enum PymetnTypes { VISA, MASTERCARD, PAYPAL }

export class PaymentInfo {

    constructor(
        public type?: PymetnTypes,
        public owner?: string,
        public cardNumber?: string,
        public date?: string,
        public csv?: number,
    ) { }

}