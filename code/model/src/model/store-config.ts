import { DiscountCode } from "./discount-code";
import { ObjectType } from "./enum";
import { MarketTabsInformation } from "./market-tabs-information";

export class StoreConfiguration {

    constructor(
        public type: ObjectType,
        public storeName: string,
        public tabs: MarketTabsInformation[],
        public globalDiscount: DiscountCode
    ) { }

}