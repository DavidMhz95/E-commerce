import { Injectable } from '@angular/core';
import { Product } from '../layout/products-view/products-view.component';
import { CopyObject } from '../app.utils';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private totalPrice:number = 0
  public products:Product[]= []
  constructor() { 
  }

  public AddProduct(product:Product){
    this.products.push(product)
  }

  public RemoveProduct(product:Product){
    const index: number = this.products.indexOf(product);
    if (index !== -1) {
        this.products.splice(index, 1);
    }    
  }

  public GetPrize(){
    this.totalPrice = 0;
    this.products.forEach((element:Product) => {
      this.totalPrice+=element.actualPrize
    })
    return this.totalPrice.toFixed(2)
  }
}
