export declare enum PymetnTypes {
    VISA = 0,
    MASTERCARD = 1,
    PAYPAL = 2
}
export declare class PaymentInfo {
    type?: PymetnTypes | undefined;
    owner?: string | undefined;
    number?: string | undefined;
    date?: string | undefined;
    csv?: number | undefined;
    constructor(type?: PymetnTypes | undefined, owner?: string | undefined, number?: string | undefined, date?: string | undefined, csv?: number | undefined);
}
