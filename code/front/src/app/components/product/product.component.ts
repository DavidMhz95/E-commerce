import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { DataService } from 'src/app/shared/data.service';
import { ProductService } from 'src/app/servicesForModels/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth + 'px'
  }

  @ViewChild('imageDiv', { static: true }) imageDiv: ElementRef
  @Input('product') product: Product

  constructor(public sanitizer: DomSanitizer, public productService: ProductService, public productDialog: MatDialog) { }

  ngOnInit(): void {

    if(this.product.images){
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth + 'px'
    this.imageDiv.nativeElement.addEventListener("mouseover", (event: any) => {
      if (this.product.images.length > 1) {
        this.imageDiv.nativeElement.style.backgroundImage = 'url(' + this.productService?.getProductImages( this.product.images[1]) + ')'
      }
    }, false);
    this.imageDiv.nativeElement.addEventListener("mouseout", (event: any) => {
      if (event && event.toElement && event.toElement.parentNode && event.toElement.parentNode != this.imageDiv.nativeElement) {
        this.imageDiv.nativeElement.style.backgroundImage = 'url(' + this.productService?.getProductImages( this.product.images[0]) + ')'
      }
    }, false);


    this.product.images.forEach((imageSrc: string) => {
      let img = new Image()
      img.src = imageSrc
    })



    let img = new Image()
    img.src = this.product.images[0]
    img.onload = () => {
      console.log(img.src)
      this.imageDiv.nativeElement.style.backgroundImage = 'url(' + this.productService?.getProductImages( this.product.images[0]) + ')'
    }
    img.onerror = () => {
      //this.imageDiv.nativeElement.style.backgroundImage = 'url(' + this.product.images[0] + ')'
    }
    }

  }

  ngAfterViewChecked() {
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth + 'px'
  }

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

