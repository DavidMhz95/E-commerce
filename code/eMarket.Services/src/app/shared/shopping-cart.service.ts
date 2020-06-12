import { Injectable } from '@angular/core';
import { Product } from '../components/product/product.component';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private totalPrice: number = 0
  private totalElements: number = 0

  public products: CartProduct[] = []

  constructor() { }

  public AddProduct(product: Product) {
    var found: boolean
    this.products.forEach((p: CartProduct) => {
      if (p.product.id == product.id) {
        p.number++
        found = true
      }
    })

    if (!found) {
      this.products.push({
        product,
        number: 1
      })
    }
  }

  public RemoveProduct(product: Product) {
    this.products.forEach((p: CartProduct) => {
      if (p.product.id == product.id) {
        p.number--
      }
    })
    this.products = this.products.filter((product: CartProduct) => product.number > 0)
  }

  public GetPrize(): string {
    this.totalPrice = 0;
    this.products.forEach((element: CartProduct) => {
      this.totalPrice += element.product.actualPrize * element.number
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
