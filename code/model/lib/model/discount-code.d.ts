import { Product } from './product';
import { User } from './user';
export declare class DiscountCode {
    code: string;
    discountType: DiscountType;
    value: number;
    discountApplication: DiscountApplication;
    repetitions: number;
    user: User[];
    products: Product[];
    section: string;
    subsection: string;
    minPurchase: number;
    color: string;
    dateFrom: Date;
    dateTo: Date;
    constructor(code: string, discountType: DiscountType, //Porcentaje, valor absoluto,
    value: number, discountApplication: DiscountApplication, //Envío, Productos, Categoria, Subcategoria, Todo
    repetitions: number, user: User[], products: Product[], section: string, subsection: string, minPurchase: number, color: string, dateFrom: Date, dateTo: Date);
}
export declare enum DiscountType {
    Percentage = "Porcentaje",
    AbsoluteValue = "Valor"
}
export declare enum DiscountApplication {
    Todo = "Todo",
    Envio = "Envio"
}
