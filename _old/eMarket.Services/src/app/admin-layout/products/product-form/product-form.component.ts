import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/components/product/product.component';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input('typeOfProduct') product: Product;

  public id: string
  public description: string
  public details: string
  public stock: number
  public images: string[]
  public price: number
  public offerPrice: number
  public name : string
  isSaleEnabled: boolean = false
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  public addProduct() {
    //Añadimos los tipos de producto
    if (!this.dataService.typeOfProduct.map(p => p.name).includes(this.product.name)) {
      //this.dataService.typeOfProduct.push({ name: this.product.name, properties: this.product.properties })
    }
  }
  
}
