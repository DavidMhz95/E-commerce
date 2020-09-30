import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/data.service';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-checkout',
  templateUrl: './shopping-cart-checkout.component.html',
  styleUrls: ['./shopping-cart-checkout.component.scss']
})
export class ShoppingCartCheckoutComponent implements OnInit {

  public order: Order = {
    customer: {
      email: undefined,
      image: undefined,
      name: undefined,
      totalSpent: undefined,
      isSubscribed: false
    },
    date: Date.now.toString(),
    id: undefined,
    products: []
  }

  constructor(public cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.order.products = this.cartService.products
  }

}


