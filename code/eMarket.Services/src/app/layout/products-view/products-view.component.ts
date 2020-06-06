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
        isSale: false,
        title: "Top - Active green",
        actualPrize: 22.46,
        beforePrize: 29.95,
        imageA: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM598_194c4d2f-6a6c-45c6-8156-07684ed963b0_900x.jpg?v=1585055853",
        imageB: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM606_f1dec685-ca06-42ed-9207-7944be333876_900x.jpg?v=1585055859"
      },
      {
        isSale: true,
        title: "Top - Active green",
        actualPrize: 22.46,
        beforePrize: 29.95,
        imageA: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM598_194c4d2f-6a6c-45c6-8156-07684ed963b0_900x.jpg?v=1585055853",
        imageB: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM606_f1dec685-ca06-42ed-9207-7944be333876_900x.jpg?v=1585055859"
      },
      {
        isSale: false,
        title: "Top - Active green",
        actualPrize: 22.46,
        beforePrize: 29.95,
        imageA: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM598_194c4d2f-6a6c-45c6-8156-07684ed963b0_900x.jpg?v=1585055853",
        imageB: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM606_f1dec685-ca06-42ed-9207-7944be333876_900x.jpg?v=1585055859"
      },
      {
        isSale: true,
        title: "Top - Active green",
        actualPrize: 22.46,
        beforePrize: 29.95,
        imageA: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM598_194c4d2f-6a6c-45c6-8156-07684ed963b0_900x.jpg?v=1585055853",
        imageB: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM606_f1dec685-ca06-42ed-9207-7944be333876_900x.jpg?v=1585055859"
      },
      {
        isSale: true,
        title: "Top - Active green",
        actualPrize: 22.46,
        beforePrize: 29.95,
        imageA: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM598_194c4d2f-6a6c-45c6-8156-07684ed963b0_900x.jpg?v=1585055853",
        imageB: "https://cdn.shopify.com/s/files/1/2991/2402/products/2020-03-13AGONGYM606_f1dec685-ca06-42ed-9207-7944be333876_900x.jpg?v=1585055859"
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
}