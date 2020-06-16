import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss']
})
export class TableProductsComponent implements OnInit {


  @Input('productsData') productsData:any 
  constructor() {}

  ngOnInit(): void {
    console.log(this.productsData)
  }
  dataSource  = new MatTableDataSource (this.productsData);
  displayedColumns: string[] = ['id', 'isSale', 'title', 'actualPrize','beforePrize','images','description','details','moreDetails','stockNumber'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsData.filter = filterValue.trim().toLowerCase();
  }
}
