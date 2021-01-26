import { ObjectType } from './enum';
import { Product } from './product';
import { User } from './user';
export declare class DiscountCode {
    code: string;
    description: string;
    discountType: DiscountType;
    value: number;
    discountApplication: DiscountApplication;
    repetitions: number;
    users: User[];
    products: Product[];
    section: string;
    subsection: string;
    minPurchase: number;
    color: string;
    dateFrom: Date;
    dateTo: Date;
    type: ObjectType;
    constructor(code: string, description: string, discountType: DiscountType, // Porcentaje, valor absoluto,
    value: number, discountApplication: DiscountApplication, // Envío, Productos, Categoria, Subcategoria, Todo
    repetitions: number, users: User[], products: Product[], section: string, subsection: string, minPurchase: number, color: string, dateFrom: Date, dateTo: Date, type: ObjectType);
}
export declare enum DiscountType {
    Percentage = "Porcentaje",
    AbsoluteValue = "Valor"
}
export declare enum DiscountApplication {
    Todo = "Todo",
    Envio = "Envio"
}
