import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Product } from 'src/app/components/product/product.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  isSaleEnabled: boolean = false
  isTypeProduct: boolean = false
  isProduct: boolean = false
  @Input('product') product: Product
  @Input('productsData') productsData:any 
  constructor(public dataService:DataService, public activatedRoute:ActivatedRoute) { }


  public productView: boolean = true
  public tableView: boolean = false
  public sections: any
  ngOnInit(): void {
     this.sections = this.dataService.sections
     console.log(this.sections)
     this.product = this.dataService.products.filter((p: Product)=>{ return this.activatedRoute.snapshot.params.id == p.id})[0]   
  }

  public addProduct(){
    console.log('Añadiendo producto')
  }

  public showProductView(){
    this.productView= true
    this.tableView = false
  }
  
  
  public showTableView(){
    this.productView= false
    this.tableView = true
  }

  public tipoProductoToggle(){
    this.isTypeProduct = true
    this.isProduct = false
  }

  public productoToggle(){
    this.isTypeProduct = false
    this.isProduct = true
    
  }
}


