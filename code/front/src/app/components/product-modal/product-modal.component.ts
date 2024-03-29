import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Product } from 'black-market-model'

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProductModalComponent>, @Inject(MAT_DIALOG_DATA) public product: Product) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
