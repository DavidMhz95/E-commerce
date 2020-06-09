import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Product } from 'src/app/layout/products-view/products-view.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth+'px'
  }

  @ViewChild('imageDiv', {static: true}) imageDiv:ElementRef
  @Input('product') product:Product 
  imageA:any
  imageB:any
  
  constructor(public sanitizer:DomSanitizer, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth+'px'
    this.imageDiv.nativeElement.addEventListener("mouseover", ()=> {   
      this.imageDiv.nativeElement.style.backgroundImage='url(' + this.product.images[1] + ')'
    }, false);
    this.imageDiv.nativeElement.addEventListener("mouseout", ()=> {   
      this.imageDiv.nativeElement.style.backgroundImage='url(' + this.product.images[0] + ')'
    }, false);

    if (this.product.images[0]) {
      let img = new Image()
      img.src = this.product.images[0]
      img.onload = () => {
        this.imageDiv.nativeElement.style.backgroundImage='url(' + this.product.images[0] + ')'
      }
      img.onerror = () => {
        this.imageDiv.nativeElement.style.backgroundImage='url(' + this.product.images[0] + ')'
      }
    }
  }

  ngAfterViewChecked(){
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth+'px'
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductModalComponent,{data:this.product});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
