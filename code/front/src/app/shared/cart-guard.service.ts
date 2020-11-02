import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartGuardService implements CanActivate {

  constructor(public router: Router, public cartService: ShoppingCartService) { }

  canActivate(): boolean {
    let result: boolean = this.cartService.products && this.cartService.products.length > 0
    if (!result) {
      this.router.navigate(['landing/cart'])
    }
    return result
  }
}
