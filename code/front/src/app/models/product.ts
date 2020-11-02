import { CrossStock } from './crossStock';
import { Property } from './property';

export class Product {

    constructor(
        public reference: string,
        public properties: Property[],
        public name: string,
        public offerPrice: number,
        public price: number,
        public images: string[],
        public description: string,
        public details: string[],
        public stockNumber: CrossStock[],
        public section:string,
        public subsection:string
    ) {}

  }