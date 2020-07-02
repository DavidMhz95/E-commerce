import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-type-of-product-table',
  templateUrl: './type-of-product-table.component.html',
  styleUrls: ['./type-of-product-table.component.scss']
})
export class TypeOfProductTableComponent implements OnInit {

  constructor() { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @Input('properties') properties: any
  
    ngOnInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.properties
    }
  
    displayedColumns: string[] = ['name', 'options'];
    dataSource = new MatTableDataSource();
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    setTypeOfProduct(){

    }
   
    duplicateTypeOfProduct( ) {
    
    }
  
    removeTypeOfProduct() {

    }



}
