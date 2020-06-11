import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {

  public title: string = "All Products"
  section: string
  subsection: string


  constructor(private route: ActivatedRoute, public dataService: DataService, public cartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.subsection = params.get('subsection')
      this.section = params.get('section')
      if (this.subsection) {
        this.title = this.subsection
      } else if (this.section) {
        this.title = this.section
      }
    })    
  }
}
