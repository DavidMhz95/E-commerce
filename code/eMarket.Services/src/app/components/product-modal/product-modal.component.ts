import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/layout/products-view/products-view.component';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

  public nProduct:Product
  public pProduct:Product
  constructor(public dialogRef: MatDialogRef<ProductModalComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  prevProduct(){

  }

  nextProduct(){
    
  }
}
