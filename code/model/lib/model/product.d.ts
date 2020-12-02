import { CrossStock } from './cross-stock';
import { ObjectType } from './enum';
import { Property } from './property';
export declare class Product {
    reference: string;
    properties: Property[];
    name: string;
    offerPrice: number;
    price: number;
    images: string[];
    description: string;
    details: string[];
    stock: CrossStock[];
    section: string;
    subsection: string;
    type: ObjectType;
    constructor(reference: string, properties: Property[], name: string, offerPrice: number, price: number, images: string[], description: string, details: string[], stock: CrossStock[], section: string, subsection: string, type: ObjectType);
}
