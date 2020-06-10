import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { CopyObject } from '../app.utils';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private dataService:DataService, private cartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.cartService.products = CopyObject(this.dataService.products)
  }

}
