import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd} from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';
import { Product } from 'src/app/models/product';
import { Route } from '@angular/compiler/src/core';
import { ProductService } from 'src/app/servicesForModels/product.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  @Input('product') product: Product
  @Input('isSimpleView') isSimpleView : boolean = false
  @Output() addedInCart = new EventEmitter<string>()


  public value: number = 1

  constructor(public dataService:DataService, public activatedRoute:ActivatedRoute, public cartService:ShoppingCartService, public router:Router, public productService: ProductService) {
    router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.product = undefined
        this.product = this.dataService.products.filter((p: Product)=>{ return this.activatedRoute.snapshot.params.id == p.reference})[0]  
      }
    })
   }

  ngOnInit(): void {
    if(!this.product){
      this.activatedRoute.snapshot.params.id
      this.product = this.dataService.products.filter((p: Product)=>{ return this.activatedRoute.snapshot.params.id == p.reference})[0]       
    }
  }

  public valueChanged(event:number){
    this.value = event 
  }

  public emitAddedInCart(){
    this.addedInCart.emit("Product added")
  }

  public deleteProduct(ref){
    this.productService.delete(ref).subscribe(
      response => {
        if(response){
          this.router.navigate(['/'])
        }
      },
      error => {
        console.log(error)
      }
    )
    
    this.productService.getProducts().subscribe(
      response => {
        if(response){
          this.dataService.products = response
          console.log(this.dataService.products)
        }
      },
      error => {
        console.log(error)
      }
    )

  }

  public editProduct(ref){
    this.router.navigate(['/admin/products'])
  }

}
