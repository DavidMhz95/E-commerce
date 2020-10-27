import { Component, OnInit, Input } from '@angular/core';
import { DataService, Dictionary, TypeOfProduct } from 'src/app/shared/data.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/servicesForModels/product.service';
import { CdkCell } from '@angular/cdk/table';
import { CopyObject } from 'src/app/app.utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public product: Product
  public isEditionMode: boolean

  constructor(public dataService: DataService, public activatedRoute: ActivatedRoute, public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(response => {
      if (response) {
        this.dataService.products = response
      } else {
        this.dataService.products = []
      }
    }, error => {
      console.log(error)
    })
  }

  remove(reference: string) {
    if (reference && confirm("¿Seguro que quieres borrar el producto con referencia: " + reference + "? ")) {
      this.productService.delete(reference).subscribe(response => {
        if (response) {
          this.dataService.products = this.dataService.products.filter((p: Product) => p.reference != reference)
          alert("Producto borrado correctamente")
        }
      }, error => {
        console.log(error)
      })
    }
  }

  add(product: Product) {
    console.log(product)
    this.productService.create(product).subscribe(response => {
      if (response) {
        let listOfProducts = CopyObject(this.dataService.products)
        listOfProducts.push(product)
        this.dataService.products = listOfProducts
        alert("Producto Creado correctamente")
      }
    }, error => {
      console.log(error)
    })
  }

  editProduct(product: Product) {
    this.productService.update(product).subscribe(response => {
      if (response) {
        alert("Producto editado correctamente")
      }
    }, error => {
      console.log(error)
    })
  }

  edit(product: Product) {
    this.isEditionMode = true
    this.product = product
  }


}



