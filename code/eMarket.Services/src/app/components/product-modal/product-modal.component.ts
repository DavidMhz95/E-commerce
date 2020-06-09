import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/layout/products-view/products-view.component';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

  public nProduct:Product
  public pProduct:Product
  constructor(public dialogRef: MatDialogRef<ProductModalComponent>, @Inject(MAT_DIALOG_DATA) public product: Product) { }

  ngOnInit(): void {

    console.log(this.product)
  }

  closeDialog() {
    this.dialogRef.close();
  }

  prevProduct(){

  }

  nextProduct(){
    
  }
}
