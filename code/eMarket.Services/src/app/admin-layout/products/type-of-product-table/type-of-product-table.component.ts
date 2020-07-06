import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-type-of-product-table',
  templateUrl: './type-of-product-table.component.html',
  styleUrls: ['./type-of-product-table.component.scss']
})
export class TypeOfProductTableComponent implements OnInit {

  constructor() { }

 // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @Output() copy: EventEmitter<any> = new EventEmitter()
  @Input('typeOfProducts') typeOfProducts: any
  
    ngOnInit(): void {
      //this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(this.typeOfProducts);
    }
  
    displayedColumns: string[] = ['name', 'properties', 'opciones'];
    dataSource = new MatTableDataSource();
  
    // applyFilter(event: Event) {
    //   const filterValue = (event.target as HTMLInputElement).value;
    //   this.dataSource.filter = filterValue.trim().toLowerCase();
    // }
  
    setTypeOfProduct(row){
      this.copy.emit(row)
    }
   
    duplicateTypeOfProduct(row ) {
      this.copy.emit(row)
    }
  
    removeTypeOfProduct(row) {
      this.copy.emit(row)
    }

  ngAfterViewChecked(){
    this.dataSource = new MatTableDataSource(this.typeOfProducts);
  }



}
