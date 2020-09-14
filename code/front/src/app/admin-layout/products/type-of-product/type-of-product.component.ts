import { Component, OnInit, Input } from '@angular/core';
import { Dictionary, DataService, TypeOfProduct } from 'src/app/shared/data.service';

@Component({
  selector: 'app-type-of-product',
  templateUrl: './type-of-product.component.html',
  styleUrls: ['./type-of-product.component.scss']
})
export class TypeOfProductComponent implements OnInit {
  @Input('typeOfProduct') typeOfProduct: TypeOfProduct;
 @Input('isEdition') isEdition: boolean;
 
  public newProperty: string
  public newPropertyValue: string[] = []
  isTypeProduct: boolean = false

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  public addProperty() {
    if (this.newProperty) {
      this.typeOfProduct.properties.set(this.newProperty, [])
    }
    this.newProperty = undefined
    this.newPropertyValue = []
  }

  public removeFromProperties(property) {
    this.typeOfProduct.properties.delete(property.key)
  }

  public addPropertyValue(property, i) {
    var keyPairValue = this.typeOfProduct.properties.get(property.key)
    if (!keyPairValue) {
      keyPairValue = []
    }
    if (this.newPropertyValue[i] && !keyPairValue.includes(this.newPropertyValue[i])) {
      keyPairValue.push((this.newPropertyValue[i]))
    }
    this.newPropertyValue[i] = undefined
  }


  public addProductType() {
    //Añadimos los tipos de producto
    if (!this.dataService.typeOfProduct.map(p => p.name).includes(this.typeOfProduct.name)) {
      this.dataService.typeOfProduct.push({ name: this.typeOfProduct.name, properties: this.typeOfProduct.properties })
    }
  }

  public setProductType(value) {
    console.log(value)
  }

  public remove(key: string, propertyValue: string) {
    var values = this.typeOfProduct.properties.get(key)
    const index = values.indexOf(propertyValue);
    if (index >= 0) {
      values.splice(index, 1);
    }
  }
}

