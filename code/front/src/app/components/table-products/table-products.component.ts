import { Component, OnInit, Input, ViewChild, Inject, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CopyObject } from 'src/app/app.utils';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/shared/data.service';
import { ProductService } from 'src/app/servicesForModels/product.service';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss']
})

export class TableProductsComponent implements OnInit {

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

@Input('productsData') productsData: Product[]
@Output() edit: EventEmitter<any> = new EventEmitter()

  constructor(private dialog : MatDialog, public dataService : DataService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.productsData
    
  }
  
  displayedColumns: string[] = ['reference', 'name', 'offerPrice', 'price','images','opciones'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal(images){
    console.log(images)
  
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: {images}
    });
    
  }

  deleteProduct(id){
    //Hay que borrar de dataService?.products pero lo borro del input de momento pa no borrar mil productos jeje
    for(let i in this.dataSource.data){
      console.log(this.dataSource.data[i]); 
    }

  }

  updateProduct(id){
    console.log(id)
  }

  duplicateTypeOfProduct(row) {
    this.productsData.push(CopyObject(row))
    this.UpdateDataSource()
  }

  removeTypeOfProduct(row) {
    if (confirm('¿Estás seguro de eliminar producto?')) {
      const index = this.productsData.indexOf(row)
      if (index > -1) {
        this.productsData.splice(index, 1)
        this.UpdateDataSource()
      }
    }
  }

  private UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.productsData);
    this.dataSource.paginator = this.paginator;
  }

  editEmission(product:Product){
    this.edit.emit(product)
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <div *ngFor="let image of data?.images" style="height: 250px; width: 250px; border: 10px;  background-size: cover;  background-position: center center;" [style.backgroundImage]="'url(' + productService?.getProductImages(image) + ')'">
  </div>
  `
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public productService: ProductService) {
      for (let image of data.images)
      console.log(image)
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
