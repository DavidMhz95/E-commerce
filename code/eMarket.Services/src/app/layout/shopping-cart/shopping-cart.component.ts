import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../products-view/products-view.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'prize', 'number'];
  dataSource: MatTableDataSource < Product > ;
  constructor(public cartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.cartService.products)
  }

  deleteProduct(product:Product){
    this.cartService.RemoveProduct(product)
    this.dataSource = new MatTableDataSource(this.cartService.products)
  }
}
