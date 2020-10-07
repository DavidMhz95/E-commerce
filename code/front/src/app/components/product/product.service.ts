import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public productDialog: MatDialog) { }

  private dialogRef:MatDialogRef<ProductModalComponent, any>
  openDialog(product:Product){
    if (this.dialogRef && this.productDialog && this.productDialog.openDialogs && this.productDialog.openDialogs.length>0){
      //Only changes data
      this.dialogRef.componentInstance.product = product
    }else{
      //Open dialog
      this.dialogRef = this.productDialog.open(ProductModalComponent, {
        data: product,
      })
    }   
    document.getElementById("dialog").scrollTop = 0
  }
}
