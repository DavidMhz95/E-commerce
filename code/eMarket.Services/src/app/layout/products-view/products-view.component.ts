import { Component, OnInit, HostListener } from '@angular/core';
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

  //Infinite scroll options
  public finishPage = 5;
  public actualPage: number = 0;
  public isLoading = false;
  showScrollHeight = 400;
  hideScrollHeight = 200;
  showGoUpButton: boolean;

  @HostListener('window:scroll', []) onWindowScroll() {
    if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  constructor(private route: ActivatedRoute, public dataService: DataService, public cartService: ShoppingCartService) {
    this.actualPage = 1;
    this.showGoUpButton = false;
  }

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

  onScroll(force:boolean) {
    if (this.actualPage < this.finishPage || force) {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.add4Product()
        console.log(this.actualPage)
        console.log(this.finishPage)
        console.log(this.isLoading)
      }, 2000)
      this.actualPage++
    }
  }

  public add4Product() {
    for (var i: number = 0; i < 2; i++) {
      var randomId = Math.floor((Math.random() * this.dataService.products.length));
      this.dataService.products.push(this.dataService.products[randomId])
    }
  }
}
