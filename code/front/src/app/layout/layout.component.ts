import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService, private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    // this.dataService.products.forEach((product:Product)=>{
    //   this.cartService.AddProduct(product, 1)
    // })
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        document.body.scrollTop = 0; // Safari
        document.documentElement.scrollTop = 0; // Other
      }
    })
  }

}
