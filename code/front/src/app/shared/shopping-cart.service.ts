import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private totalPrice: number = 0
  private totalElements: number = 0

  public products: CartProduct[] = []

  constructor(private dataService:DataService) {
    //this.AddProduct(this.dataService.products[0], 4)
  }

  public AddProduct(product: Product, value: number) {
    var found: boolean
    console.log(product,value)
    this.products.forEach((p: CartProduct) => {
      if (p.product.reference == product.reference) {
        if (value) {
          p.number += value
        } else {
          p.number++
        }
        found = true
      }
    })

    if (!found) {
      this.products.push({
        product,
        number: value
      })
    }
  }

  public RemoveProduct(product: Product, removeAll: boolean) {
    this.products.forEach((p: CartProduct) => {
      if (p.product.reference == product.reference) {
        if (removeAll) {
          p.number = 0
        } else {
          p.number--
        }
      }
    })
    this.products = this.products.filter((product: CartProduct) => product.number > 0)
  }

  public GetPrize(): string {
    this.totalPrice = 0;
    this.products.forEach((element: CartProduct) => {
      if(element.product.offerPrice){
      this.totalPrice += element.product.offerPrice * element.number
      }else{
        this.totalPrice += element.product.price * element.number 
      }
    })
    return this.totalPrice.toFixed(2)
  }

  public GetElements(): string {
    this.totalElements = 0;
    this.products.forEach((element: CartProduct) => {
      this.totalElements += element.number
    })
    return this.totalElements.toFixed(0)
  }
}

export interface CartProduct {
  product: Product
  number: number
}
