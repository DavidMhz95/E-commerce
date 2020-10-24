import { Property } from './property';
import { ObjectType, IObjectyType } from './enum';

export class Product implements IObjectyType {

    type: ObjectType = ObjectType.Product
    
    constructor(
        public reference: string,
        public properties: Property[],
        public name: string,
        public offerPrice: number,
        public price: number,
        public images: string[],
        public description: string,
        public details: string[],
        public stockNumber: number,
        public section: string,
        public subsection: string,
    ) { }

}