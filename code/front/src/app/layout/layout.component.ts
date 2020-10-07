import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { Router, NavigationStart } from '@angular/router';
import { ProductService } from 'src/app/servicesForModels/product.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService, private cartService: ShoppingCartService, public productService : ProductService) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(
      response =>{
        if(response){
          this.dataService.products = response
          console.log(this.dataService.products)
        }
      },
      error =>{
        console.log(error)
      }
    )
    


    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        document.body.scrollTop = 0; // Safari
        document.documentElement.scrollTop = 0; // Other
      }
    })
  }

}
