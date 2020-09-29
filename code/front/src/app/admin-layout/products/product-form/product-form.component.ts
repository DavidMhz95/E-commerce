import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {


  isSaleEnabled: boolean = false

  public newProperty: string
  public newPropertyValue: string[] = []
  constructor() { }

  ngOnInit(): void {
  }

  // Properties
  public addProperty() {
    // if (this.newProperty) {
    //   this.typeOfProduct.properties.set(this.newProperty, [])
    // }
    // this.newProperty = undefined
    // this.newPropertyValue = []
  }

  public removeFromProperties() {
    // this.typeOfProduct.properties.delete(property.key)
  }

  public addPropertyValue() {
    // var keyPairValue = this.typeOfProduct.properties.get(property.key)
    // if (!keyPairValue) {
    //   keyPairValue = []
    // }
    // if (this.newPropertyValue[i] && !keyPairValue.includes(this.newPropertyValue[i])) {
    //   keyPairValue.push((this.newPropertyValue[i]))
    // }
    // this.newPropertyValue[i] = undefined
  }

  public remove(){

  }

        

  //End of properties
}
