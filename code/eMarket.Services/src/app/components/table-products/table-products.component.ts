import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss']
})
export class TableProductsComponent implements OnInit {

@Input('productsData') productsData: any

  constructor() { }

  ngOnInit(): void {
  }

}
