import { Component, OnInit, ɵConsole } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { Router, NavigationStart } from '@angular/router';
import { ProductService } from 'src/app/servicesForModels/product.service';
import { Section } from 'black-market-model';
import { ConfigurationService } from '../servicesForModels/configuration.service';
import { DiscountCodeService } from '../servicesForModels/discountCode.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService, private cartService: ShoppingCartService, public productService: ProductService, public discountCodeService: DiscountCodeService ,  public configurationService: ConfigurationService) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(
      response => {
        if (response) {
          this.dataService.products = response
          this.getSections()
        }
      },
      error => {
        console.log(error)
      }
    )

    this.discountCodeService.getAll().subscribe(
      response => {
        if (response) {
          this.dataService.discountCodes = response
          this.dataService.mainPageDiscount = this.dataService.discountCodes.filter(e => e.isInMainPage==true)[0]
          console.log(this.dataService.mainPageDiscount)
        }
      },
      error => {
        console.log(error)
      }
    )

    this.configurationService.getConfiguration().subscribe(
      response => {
        if (response) {
          this.dataService.configuration = response[0]
        }
      },
      error => {
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


  private getSections() {
    let dict: { [key: string]: string[] } = {}
    var stringArray: string[] = []

    this.dataService.products.forEach(p => {
      if (!(p.section in dict)) {
        stringArray = []
        stringArray.push(p.subsection)
        dict[p.section] = stringArray;
      }
      else if (p.section in dict && !dict[p.section].includes(p.subsection)) {
        stringArray = dict[p.section]
        stringArray.push(p.subsection)
        dict[p.section] = stringArray;
      }
    });

    this.dataService.sections = []
    for (let key in dict) {
      let array = dict[key];
      var section: Section = new Section(key, array)
      this.dataService.sections.push(section)
    }
  }

}
