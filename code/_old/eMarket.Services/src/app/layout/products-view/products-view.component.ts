import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Section } from 'src/app/shared/data.service';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ProductsPipe } from './products.pipe';

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
  showScrollHeight = 300;
  hideScrollHeight = 200;
  showGoUpButton: boolean;
  actualSection: Section

  @HostListener('window:scroll', []) onWindowScroll() {
    if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  constructor(private activatedRoute: ActivatedRoute, public dataService: DataService, public cartService: ShoppingCartService) {
    this.actualPage = 1;
    this.showGoUpButton = false;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.subsection = params.get('subsection')
      this.section = params.get('section')

      this.actualSection = this.findActualSection(this.section)
      if (this.subsection) {
        this.title = this.subsection
        this.actualSection = { title: this.subsection, sections: [] }
      } else if (this.section) {
        this.title = this.section
      }
    })
  }

  onScroll(force: boolean) {
    if (this.actualPage < this.finishPage || force) {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.add4Product()
      }, 2000)
      this.actualPage++

    }
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (event.index == 0) {
      if (this.section == this.actualSection.title) {
        this.subsection = undefined
      }else{
        this.section = undefined
      }
    } else {
      if (this.section == this.actualSection.title) {
        this.subsection = event.tab.textLabel
      } else {
        this.section = event.tab.textLabel
      }
    }
  }

  public add4Product() {
    for (var i: number = 0; i < 2; i++) {
      var randomId = Math.floor((Math.random() * this.dataService.products.length));
      this.dataService.products.push(this.dataService.products[randomId])
    }
  }

  public findActualSection(section: string): Section {
    var result: Section
    this.dataService.sections.forEach((s: Section) => {
      if (s.title == section) {
        result = s
      }
    })
    if (!result) {
      result = {
        title: "All",
        sections: this.dataService.sections
      }
    }
    return result
  }

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }
}