import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';
import { Order } from 'src/app/models/order';
import { UserService } from 'src/app/servicesForModels/user.service';
import { Address } from '../../../models/address';
import { PaymentInfo } from 'src/app/models/payment-info';
import { OrderService } from 'src/app/servicesForModels/order.service';
import { CopyObject } from 'src/app/app.utils';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart-checkout',
  templateUrl: './shopping-cart-checkout.component.html',
  styleUrls: ['./shopping-cart-checkout.component.scss']
})
export class ShoppingCartCheckoutComponent implements OnInit {

  order: Order = new Order()
  address: Address = new Address()
  paymentInfo: PaymentInfo = new PaymentInfo()

  saveShippingInformation: boolean = false
  savePaymenInformation: boolean = false

  shipmentTypes: any[] = [{ type: 'Estándar', value: 0, price: 3.95, details: "2-3 Días laborables" },
  { type: 'Express', value: 1, price: 6.99, details: "24 Horas" }];

  constructor(public cartService: ShoppingCartService, public userService: UserService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.order.user = this.userService.loggedUser
    if (this.order.user && this.order.user.address) {
      this.address = CopyObject(this.order.user.address)
    }
    if (this.order.user && this.order.user.payment) {
      this.paymentInfo = CopyObject(this.order.user.payment)
    }
    this.order.products = this.cartService.products
    this.order.typeShipment = this.shipmentTypes[0]
  }

  orderSubmit() {
    if (this.saveShippingInformation) {
      this.order.user.address = this.address
    }
    if (this.savePaymenInformation) {
      this.order.user.payment = this.paymentInfo
    }

    let requests: Observable<any>[] = [this.orderService.create(this.order)]
    if (this.saveShippingInformation || this.savePaymenInformation) {
      requests.push(this.userService.updateUser(this.order.user))
    }
    forkJoin(requests).subscribe((responses) => {
      alert("Pedido realizado")
      this.cartService.products = []
      this.router.navigate(['/profile'])
    }, error => {
      console.error(error)
    })

  }
}


