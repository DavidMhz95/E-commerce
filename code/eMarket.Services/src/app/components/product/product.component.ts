import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Product } from 'src/app/layout/products-view/products-view.component';
import { DomSanitizer } from '@angular/platform-browser';

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
  
  constructor(public sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth+'px'
    this.imageDiv.nativeElement.addEventListener("mouseover", ()=> {   
      this.imageDiv.nativeElement.style.backgroundImage='url(' + this.product.imageB + ')'
    }, false);
    this.imageDiv.nativeElement.addEventListener("mouseout", ()=> {   
      this.imageDiv.nativeElement.style.backgroundImage='url(' + this.product.imageA + ')'
    }, false);

    if (this.product.imageA) {
      let img = new Image()
      img.src = this.product.imageA
      img.onload = () => {
        this.imageDiv.nativeElement.style.backgroundImage='url(' + this.product.imageA + ')'
      }
      img.onerror = () => {
        this.imageDiv.nativeElement.style.backgroundImage='url(' + this.product.imageA + ')'
      }
    }
  }

  ngAfterViewChecked(){
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth+'px'
  }

}