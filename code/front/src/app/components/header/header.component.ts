import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';
import { UserService } from 'src/app/servicesForModels/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public cartService:ShoppingCartService, public userService:UserService) { }

  ngOnInit(): void {
  }

}
