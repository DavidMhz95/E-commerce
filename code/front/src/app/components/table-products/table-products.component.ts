import { Component, OnInit, Input, ViewChild, Inject, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

export class TableProductsComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() edit: EventEmitter<string> = new EventEmitter()
  @Output() remove: EventEmitter<string> = new EventEmitter()
  @Input() products: Product[] = []

  displayedColumns: string[] = ['reference', 'name', 'offerPrice', 'price', 'images', 'opciones'];
  dataSource = new MatTableDataSource();

  constructor(private dialog: MatDialog, public productService: ProductService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(event) {
    this.dataSource = new MatTableDataSource(this.products)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal(images) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: { images }
    });

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
