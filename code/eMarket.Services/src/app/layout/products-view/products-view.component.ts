import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {

  public title: string = "All Products"
  section: string
  subsection: string

  public products: Product[]

  constructor(private route: ActivatedRoute) { }

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

    this.products = [
      {
        id:0,
        isSale: false,
        title: "Top - Active green",
        actualPrize: 22.46,
        beforePrize: 29.95,
        imageA: "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM21_900x.jpg?v=1572202163",
        imageB: "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM22_900x.jpg?v=1572202163"
      },
      {
        id:1,
        isSale: true,
        title: "Top - Active green",
        actualPrize: 22.46,
        beforePrize: 29.95,
        imageA: "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM26_900x.jpg?v=1572201513",
        imageB: "https://cdn.shopify.com/s/files/1/2991/2402/products/AGONGYM31_900x.jpg?v=1572201513"
      },
      {
        id:2,
        isSale: false,
        title: "Top - Active green",
        actualPrize: 22.46,
        beforePrize: 29.95,
        imageA: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM598_194c4d2f-6a6c-45c6-8156-07684ed963b0_900x.jpg?v=1585055853",
        imageB: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM606_f1dec685-ca06-42ed-9207-7944be333876_900x.jpg?v=1585055859"
      },
      {
        id:3,
        isSale: true,
        title: "Top - Active green",
        actualPrize: 22.46,
        beforePrize: 29.95,
        imageA: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM668_2048x.jpg?v=1585055696",
        imageB: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM667_50eb4083-4ef1-4317-9449-30b5e89b304f_2048x.jpg?v=1585055696"
      },
      {
        id:4,
        isSale: true,
        title: "Top - Active green",
        actualPrize: 22.46,
        beforePrize: 29.95,
        imageA: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM331_900x.jpg?v=1585049777",
        imageB: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM333_900x.jpg?v=1585049777"
      },
    ]
  }

}

export interface Product {
  isSale: boolean
  title: string
  actualPrize: number
  beforePrize: number
  imageA: string
  imageB: string
  id:number
}