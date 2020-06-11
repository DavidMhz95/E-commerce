import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { CopyObject } from '../app.utils';
import { Product } from '../components/product/product.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private dataService:DataService, private cartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.dataService.products.forEach((product:Product)=>{
      this.cartService.AddProduct(product)
    })
  }

}
