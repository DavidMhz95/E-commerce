import { DiscountCode } from "./discount-code";
import { ObjectType } from "./enum";
import { MarketTabsInformation } from "./market-tabs-information";
export declare class StoreConfiguration {
    type: ObjectType;
    storeName: string;
    tabs: MarketTabsInformation[];
    globalDiscount: DiscountCode;
    shippingCosts: number;
    constructor(type: ObjectType, storeName: string, tabs: MarketTabsInformation[], globalDiscount: DiscountCode, shippingCosts: number);
}
