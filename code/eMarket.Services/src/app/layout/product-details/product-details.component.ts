import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd} from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';
import { Product } from 'src/app/components/product/product.component';
import { Route } from '@angular/compiler/src/core';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  @Input('product') product: Product
  public value: number = 1

  @Input('isSimpleView') isSimpleView : boolean = false

  constructor(public dataService:DataService, public activatedRoute:ActivatedRoute, public cartService:ShoppingCartService, public router:Router) {
    router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.product = undefined
        this.product = this.dataService.products.filter((p: Product)=>{ return this.activatedRoute.snapshot.params.id == p.id})[0]  
      }
    })
   }

  ngOnInit(): void {
    if(!this.product){
      this.activatedRoute.snapshot.params.id
      this.product = this.dataService.products.filter((p: Product)=>{ return this.activatedRoute.snapshot.params.id == p.id})[0]       
    }
  }

  public valueChanged(event:number){
    this.value = event
  
  }
  


}
