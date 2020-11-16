import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from './data.service';
import { CartProduct } from '../models/cart-product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private BM_Cart: string = "BM_Cart"
  private totalPrice: number = 0
  private totalElements: number = 0

  public products: CartProduct[] = []

  constructor() {
    const serializedProducts = localStorage.getItem(this.BM_Cart)
    this.products = serializedProducts ? JSON.parse(serializedProducts) : []
  }

  public AddProduct(product: Product, userProduct: Product, value: number) {
    var found: boolean
    this.products.forEach((p: CartProduct) => {
      if (p.product.reference == product.reference && JSON.stringify(p.product.properties) === JSON.stringify(userProduct.properties)) {
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
        product: userProduct,
        number: value
      })
    }

    localStorage.setItem(this.BM_Cart, JSON.stringify(this.products))
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
    this.products = this.products.filter((prod: CartProduct) => prod.number > 0)
    localStorage.setItem(this.BM_Cart, JSON.stringify(this.products))

  }

  public GetPrize(): number {
    this.totalPrice = 0;
    this.products.forEach((element: CartProduct) => {
      if (element.product.offerPrice) {
        this.totalPrice += element.product.offerPrice * element.number
      } else {
        this.totalPrice += element.product.price * element.number
      }
    })
    return this.totalPrice
  }

  public GetElements(): string {
    this.totalElements = 0;
    this.products.forEach((element: CartProduct) => {
      this.totalElements += element.number
    })
    return this.totalElements.toFixed(0)
  }
}


