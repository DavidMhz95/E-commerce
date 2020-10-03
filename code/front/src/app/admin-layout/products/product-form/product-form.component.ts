import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/app/models/property';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {


  @Input('isEdition') isEdition: boolean;

  isSaleEnabled: boolean = false

  public properties: Property[] = []
  public fakeProperty: Property

  public newPropertyName: string
  public newPropertyValues: string[] = []
  public detail: string

  public details : String [] = []
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    
  }
  // Properties

  public addPropertyName() {
    if (this.newPropertyName) {
      this.fakeProperty = new Property(this.newPropertyName, []);
      this.properties.push(this.fakeProperty)
      console.log(this.properties)
    }
    this.newPropertyName = undefined
  }

  public removeFromProperties(property) {

    this.properties.forEach(element => {
      if (element.name == property.name) {
        const index = this.properties.indexOf(element, 0);
        if (index > -1) {
          this.properties.splice(index, 1);
        }
      }
    });
  }

  public addPropertyValue(property, i) {
    console.log(property,i)
    if (this.newPropertyValues[i] && !property.values.includes(this.newPropertyValues[i])) {
      property.values.push((this.newPropertyValues[i]))
    }
    this.newPropertyValues[i] = undefined
  }

  public remove(property, value) {
    var values = property.values
    values.forEach(element => {
      if (element == value) {
        const index = values.indexOf(element.value);
        if (index >= 0) {
          values.splice(index, 1);
        }
      }

    });

  }

  public addDetails(){
    if (this.detail) {
      this.details.push(this.detail)
    }
    console.log(this.details)
    this.detail = undefined
  }

  public removeFromDetails(detail){

    this.details.forEach(element => {
      if (element == detail) {
        const index = this.details.indexOf(element, 0);
        if (index > -1) {
          this.details.splice(index, 1);
        }
      }
    });

  }
  //End of properties
}
