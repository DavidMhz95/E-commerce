import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { DataService } from 'src/app/shared/data.service';
import { ProductService } from './product.service';

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

  constructor(public sanitizer: DomSanitizer, public productService:ProductService) { }

  ngOnInit(): void {
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth + 'px'
    this.imageDiv.nativeElement.addEventListener("mouseover", (event: any) => {
      if (this.product.images.length > 1) {
        this.imageDiv.nativeElement.style.backgroundImage = 'url(' + this.product.images[1] + ')'
      }
    }, false);
    this.imageDiv.nativeElement.addEventListener("mouseout", (event: any) => {
      if (event && event.toElement && event.toElement.parentNode && event.toElement.parentNode != this.imageDiv.nativeElement) {
        this.imageDiv.nativeElement.style.backgroundImage = 'url(' + this.product.images[0] + ')'
      }
    }, false);

    this.product.images.forEach((imageSrc:string) => {
      let img = new Image()
      img.src = imageSrc
    })

    let img = new Image()
    img.src = this.product.images[0]
    img.onload = () => {
      this.imageDiv.nativeElement.style.backgroundImage = 'url(' + this.product.images[0] + ')'
    }
    img.onerror = () => {
      //this.imageDiv.nativeElement.style.backgroundImage = 'url(' + this.product.images[0] + ')'
    }
  }

  ngAfterViewChecked() {
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth + 'px'
  }

}

export interface Product {
  isSale: boolean
  title: string
  actualPrize: number
  beforePrize: number
  images: string[]
  id: number
  description: string
  details: string[]
  moreDetails: string[]
  stockNumber: number
  section:string
  subsection:string
}