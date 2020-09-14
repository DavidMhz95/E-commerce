import { Component, OnInit, Input } from '@angular/core';
import { DataService, Dictionary, TypeOfProduct } from 'src/app/shared/data.service';
import { Product } from 'src/app/components/product/product.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  
  isTypeProduct: boolean = false
  isProduct: boolean = false
  isEdition:boolean = false
  typeOfProduct: TypeOfProduct

  @Input('product') product: Product
  @Input('productsData') productsData: any

  public productView: boolean = true
  public tableView: boolean = false

  constructor(public dataService: DataService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.product = this.dataService.products.filter((p: Product) => { return this.activatedRoute.snapshot.params.id == p.id })[0]
    this.resetTypeOfProduct()
  }

  resetTypeOfProduct(){
    this.typeOfProduct = { name: undefined, properties: new Dictionary }
    this.isEdition = false
  }

}



