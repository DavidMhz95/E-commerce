import { Customer, DiscountApplication, DiscountType } from '../shared/data.service';
import { Product } from './product';

export class DiscountCode {

    constructor(
        public code: string,
        public discountType: DiscountType, //Porcentaje, valor absoluto,
        public value: number,
        public application: DiscountApplication, //Envío, Productos, Categoria, Subcategoria, Todo
        public repetitions: number,
        public customers: Customer[],
        public products: Product[],
        public section: string,
        public subsection: string,
        public minPurchase: number,
        public color: string,
        public dateFrom: Date,
        public dateTo: Date
    ){ }

}