import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';
import { UserService } from 'src/app/servicesForModels/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public cartService:ShoppingCartService, public userService:UserService, public sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }

}
