import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../products-view/products-view.component';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  @Input('product') product: Product


  constructor(public dataService:DataService, public router:ActivatedRoute) { }

  ngOnInit(): void {
    if(!this.product){
      this.router.snapshot.params.id
      this.product = this.dataService.products.filter((p: Product)=>{ return this.router.snapshot.params.id == p.id})[0]       
    }
  }

  

}
