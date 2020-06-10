import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../products-view/products-view.component';
import { ActivatedRoute} from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  @Input('product') product: Product


  constructor(public dataService:DataService, public router:ActivatedRoute, public cartService:ShoppingCartService) { }

  ngOnInit(): void {
    if(!this.product){
      this.router.snapshot.params.id
      this.product = this.dataService.products.filter((p: Product)=>{ return this.router.snapshot.params.id == p.id})[0]       
    }
  }

  

}
