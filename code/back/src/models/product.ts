import { ObjectType } from './enum';
import { TypeOfProduct } from './typeOfProduct';

export class Product {

    constructor(
        public id: number,
        public typeOfProduct: TypeOfProduct,
        public name: string,
        public offerPrice: number,
        public price: number,
        public images: string[],
        public description: string,
        public details: string[],
        public stockNumber: number,
        public section:string,
        public subsection:string,
        public type: ObjectType = 1
    ) {}

  }