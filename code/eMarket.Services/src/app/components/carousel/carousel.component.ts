import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';

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
  @Input('images') images:string[]

  public selectedIndex:number = 0
  constructor() { }

  ngOnInit(): void {
    this.imageDiv.nativeElement.style.height = this.imageDiv.nativeElement.offsetWidth+'px'
    this.imageDiv.nativeElement.style.backgroundImage='url(' + this.images[0] + ')' 
  }

  public selectImage(image:string){
    this.imageDiv.nativeElement.style.backgroundImage='url(' + image + ')' 
  }

  public nextImage(){
    this.selectedIndex++
    if(this.selectedIndex>this.images.length-1){
      this.selectedIndex = 0
    }
    this.imageDiv.nativeElement.style.backgroundImage='url(' + this.images[this.selectedIndex] + ')'
  }


  public previousImage(){
    this.selectedIndex--
    if(this.selectedIndex< 0){
      this.selectedIndex = this.images.length-1
    }
    this.imageDiv.nativeElement.style.backgroundImage='url(' + this.images[this.selectedIndex] + ')' 
  }

}
