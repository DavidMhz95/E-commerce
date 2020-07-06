import { Component, OnInit, Output, EventEmitter, Input, } from '@angular/core';



@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss']
})
export class QuantitySelectorComponent implements OnInit {

  constructor() { }

  @Input('value') public value : number = 1
  @Input('maxValue') public maxValue : number = 30 
  @Input('minValue') public minValue : number = 0

  @Output() valueChanged: EventEmitter<number> = new EventEmitter()
  


  ngOnInit(): void {
  }

  public removeOne(){
    this.value--;
    if(this.value <= this.minValue){
      this.value = this.minValue
    }
    this.valueChanged.emit(this.value)
  }

  
  public addOne(){ 
    this.value++;
    if(this.value >= this.maxValue){
      this.value = this.maxValue
    }
    this.valueChanged.emit(this.value)
  }

}
