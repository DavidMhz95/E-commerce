import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Data } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {

  public title: string = "All Products"
  section: string
  subsection: string


  constructor(private route: ActivatedRoute, public dataService: DataService ) { }

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

export interface Product {
  isSale: boolean
  title: string
  actualPrize: number
  beforePrize: number
  images: string[]
  id:number
}