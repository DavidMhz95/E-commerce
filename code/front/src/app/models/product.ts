import { Properties } from './properties';

export class Product {

    constructor(
        public ref: number,
        public properties: Properties[],
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