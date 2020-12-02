import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public cartService: ShoppingCartService) { }

  ngOnInit(): void {
   
  }

}
