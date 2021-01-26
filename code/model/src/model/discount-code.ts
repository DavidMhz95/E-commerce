import { ObjectType } from './enum';
import { Product } from './product';
import { User } from './user';

export class DiscountCode {

    constructor(
        public code: string,
        public description: string,
        public discountType: DiscountType, // Porcentaje, valor absoluto,
        public value: number,
        public discountApplication: DiscountApplication, // Envío, Productos, Categoria, Subcategoria, Todo
        public repetitions: number,
        public users: User[],
        public products: Product[],
        public section: string,
        public subsection: string,
        public minPurchase: number,
        public color: string,
        public dateFrom: Date,
        public dateTo: Date,
        public type: ObjectType
    ) { }

}

export enum DiscountType {
    Percentage = "Porcentaje",
    AbsoluteValue = "Valor",
}

export enum DiscountApplication {
    Todo = "Todo",
    // Product = "Producto",
    // Section  = "Sección",
    // Subsection = "Subsección", 
    Envio = "Envio",
}