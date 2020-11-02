import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicesForModels/user.service';
import { OrderService } from 'src/app/servicesForModels/order.service';
import { Order } from 'src/app/models/order';
import { DomSanitizer } from '@angular/platform-browser';
import { CartProduct } from 'src/app/models/cart-product';

@Component({
  selector: 'profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.scss']
})
export class ProfileOrdersComponent implements OnInit {
  isLoading: boolean = false
  lastOrder: Order
  orders: Order[] = []

  constructor(public userService: UserService, public orderService: OrderService, public sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.isLoading = true
    this.orderService.getOrderByUser(this.userService.loggedUser).subscribe((response: Order[]) => {
      //Ordenamos por fecha descendente
      response.sort((a, b) => b.id - a.id)
      //Los encajamos en los dos subtitulos
      response.forEach((order: Order, index) => {
        if (index == 0) {
          this.lastOrder = order
        } else {
          this.orders.push(order)
        }
      })
      this.isLoading = false
      console.log(response)
    }, err => {
      this.isLoading = false
    })
  }

  
}
