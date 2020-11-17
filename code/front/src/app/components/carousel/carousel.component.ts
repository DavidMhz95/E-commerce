import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/servicesForModels/product.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth+'px'
  }

  @ViewChild('imageDiv', {static: true}) imageDiv:ElementRef
  @Input('product') product: Product

  public selectedIndex:number = 0
  constructor( public productService: ProductService) { }

  ngAfterViewChecked(): void {
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth+'px'
  }

  ngOnInit(): void {
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth+'px'
  }

  public selectImage(image:string){
    console.log(image)
    this.imageDiv.nativeElement.style.backgroundImage= 'url(' + this.productService.getProductImages(image) + ')'
  }

  public nextImage(){
    this.selectedIndex++
    if(this.selectedIndex>this.product.images.length-1){
      this.selectedIndex = 0
    }
    this.imageDiv.nativeElement.style.backgroundImage='url(' + this.productService.getProductImages(this.product.images[this.selectedIndex]) + ')'
  }


  public previousImage(){
    this.selectedIndex--
    if(this.selectedIndex< 0){
      this.selectedIndex = this.product.images.length-1
    }
    this.imageDiv.nativeElement.style.backgroundImage='url(' + this.productService?.getProductImages(this.product.images[this.selectedIndex]) + ')' 
  }

}
