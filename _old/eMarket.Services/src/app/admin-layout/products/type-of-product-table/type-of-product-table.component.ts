import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, Dictionary, TypeOfProduct } from 'src/app/shared/data.service';
import { CopyObject } from 'src/app/app.utils';
import { TypeOfProductComponent } from '../type-of-product/type-of-product.component';


@Component({
  selector: 'app-type-of-product-table',
  templateUrl: './type-of-product-table.component.html',
  styleUrls: ['./type-of-product-table.component.scss']
})
export class TypeOfProductTableComponent implements OnInit {

  constructor() { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Output() edit: EventEmitter<any> = new EventEmitter()
  @Input('typeOfProducts') typeOfProducts: any

  editEmission(typeOfProduct:TypeOfProduct){
    this.edit.emit(typeOfProduct)
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource(this.typeOfProducts);
  }

  displayedColumns: string[] = ['name', 'properties', 'opciones'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  private UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.typeOfProducts);
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }
 
  duplicateTypeOfProduct(row) {
    this.typeOfProducts.push(CopyObject(row))
    this.UpdateDataSource()
  }

  removeTypeOfProduct(row) {
    if (confirm('¿Estás seguro de eliminar este tipo de producto?')) {
      const index = this.typeOfProducts.indexOf(row)
      if (index > -1) {
        this.typeOfProducts.splice(index, 1)
        this.UpdateDataSource()
      }
    }
  }

  ngAfterViewChecked() {
    this.dataSource = new MatTableDataSource(this.typeOfProducts);
  }



}
