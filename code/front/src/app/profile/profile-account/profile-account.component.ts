import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/servicesForModels/order.service';
import { UserService } from 'src/app/servicesForModels/user.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.scss']
})
export class ProfileAccountComponent implements OnInit {
  isLoading: boolean = false
  lastOrder: Order
  constructor(public userService: UserService, public orderService: OrderService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.orderService.getOrderByUser(this.userService.loggedUser).subscribe((response: Order[]) => {
      if (response && response.length > 0) {
        //Ordenamos por fecha descendente
        response.sort((a, b) => b.id - a.id)
        this.lastOrder=response[0]
      }
      this.isLoading = false
    }, err=>{
      this.isLoading = false
    })
  }

}
