import { Property } from './property';

export class Product {

    constructor(
        public ref: number,
        public properties: Property[],
        public name: string,
        public offerPrice: number,
        public price: number,
        public images: string[],
        public description: string,
        public details: string[],
        public stockNumber: number,
        public section:string,
        public subsection:string
        
    ) {}

  }