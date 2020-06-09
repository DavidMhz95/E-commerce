import { Injectable } from '@angular/core';
import { Product } from './layout/products-view/products-view.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  products:Product[] = [
    {
      id:0,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM21_900x.jpg?v=1572202163","https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM22_900x.jpg?v=1572202163"]
    },
    {
      id:1,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images:["https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM26_900x.jpg?v=1572201513","https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM31_900x.jpg?v=1572201513" , "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM30_1296x.jpg?v=1572960905", "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM29_1296x.jpg?v=1572960905"]
    },
    {
      id:2,
      isSale: false,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM598_194c4d2f-6a6c-45c6-8156-07684ed963b0_900x.jpg?v=1585055853", "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM606_f1dec685-ca06-42ed-9207-7944be333876_900x.jpg?v=1585055859"]
    },
    {
      id:3,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM668_2048x.jpg?v=1585055696", "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM667_50eb4083-4ef1-4317-9449-30b5e89b304f_2048x.jpg?v=1585055696"]
    },
    {
      id:4,
      isSale: true,
      title: "Top - Active green",
      actualPrize: 22.46,
      beforePrize: 29.95,
      images: ["https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM331_900x.jpg?v=1585049777","https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM333_900x.jpg?v=1585049777"]
    },
  ]
}
