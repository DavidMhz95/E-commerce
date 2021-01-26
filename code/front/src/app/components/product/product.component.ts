import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductService } from 'src/app/servicesForModels/product.service';
import { Product } from 'black-market-model';

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
  @Input('isAdmin') isAdmin: boolean = false
  @Output() edit: EventEmitter<Product> = new EventEmitter()
  @Output() remove: EventEmitter<Product> = new EventEmitter()

  constructor(public sanitizer: DomSanitizer, public productService: ProductService, public productDialog: MatDialog, public cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    if (this.product.images && this.product.images.length > 0) {
      this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth + 'px'
      this.imageDiv.nativeElement.addEventListener("mouseover", (event: any) => {
        if (this.product.images.length > 1) {
          this.imageDiv.nativeElement.style.backgroundImage = 'url(' + this.productService.getProductImages(this.product.images[1]) + ')'
        }
      }, false);
      this.imageDiv.nativeElement.addEventListener("mouseout", (event: any) => {
        if (event && event.toElement && event.toElement.parentNode && event.toElement.parentNode != this.imageDiv.nativeElement) {
          this.imageDiv.nativeElement.style.backgroundImage = 'url(' + this.productService.getProductImages(this.product.images[0]) + ')'
        }
      }, false);

      // this.product.images.forEach((imageSrc: string) => {
      //   let img = new Image()
      //   img.src = this.productService.getProductImages(imageSrc)
      // })

      let img = new Image()
      img.src = this.productService.getProductImages(this.product.images[0])
      img.onload = () => {
        this.imageDiv.nativeElement.style.backgroundImage = 'url(' + this.productService.getProductImages(this.product.images[0]) + ')'
      }
      img.onerror = () => {
        //this.imageDiv.nativeElement.style.backgroundImage = 'url(' + this.product.images[0] + ')'
      }
    }

  }

  ngAfterViewChecked() {
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth + 'px'
  }
}

