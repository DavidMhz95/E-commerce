import { Component, OnInit, Output, EventEmitter, Input, } from '@angular/core';



@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss']
})
export class QuantitySelectorComponent implements OnInit {

  constructor() { }

  @Input('value') public value : number = 1
  @Output()valueChanged: EventEmitter<number> = new EventEmitter()
  


  ngOnInit(): void {
  }

  public removeOne(){
    if(this.value <= 1){
      this.value = 1
    }else{
      this.value = this.value-1;
    }
    this.valueChanged.emit(this.value)
  }

  
  public addOne(){
    if(this.value >= 30){
      this.value = 30
    }else{
      this.value = this.value+1;
    }
    this.valueChanged.emit(this.value)
  }

}
