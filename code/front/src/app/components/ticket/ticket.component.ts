import { Component, OnInit, Input } from '@angular/core';
import { Order, CartProduct } from 'black-market-model';

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input('order') order: Order

  constructor() { }

  ngOnInit(): void {
  }

  getTotalPrice(order: Order) {
    let value: number = 0
    order.products.forEach((cartProduct: CartProduct) => {
      value += cartProduct.quantity * (cartProduct.product.offerPrice > 0 ? cartProduct.product.offerPrice : cartProduct.product.price)
    })
    value += order.typeShipment.price
    return value
  }

}
