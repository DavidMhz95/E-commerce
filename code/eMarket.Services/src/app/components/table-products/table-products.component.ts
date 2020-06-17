import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss']
})

export class TableProductsComponent implements OnInit {

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

@Input('productsData') productsData: any

  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.productsData
  }
  
  displayedColumns: string[] = ['id', 'title', 'actualPrize', 'beforePrize','show' ,'update', 'delete' ];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

